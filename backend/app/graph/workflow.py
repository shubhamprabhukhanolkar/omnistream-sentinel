import logging
from langgraph.graph import StateGraph, START, END
from app.graph.state import AgentState
from app.graph.nodes import orchestrator_node, drafter_node, critic_node

logger = logging.getLogger("graph_workflow")

def route_critic_decision(state: AgentState) -> str:
    """
    Evaluates whether to route to END or loop back to Drafter.
    Cyclical Condition: If critic_approved is False, loop back to 'drafter'.
    """
    approved = state.get("critic_approved", False)
    iteration = state.get("iteration_count", 1)
    max_loops = state.get("max_iterations", 3)
    
    if approved:
        logger.info(f"Critic approved on iteration {iteration}. Exiting graph to human sign-off.")
        return END
    
    if iteration >= max_loops:
        logger.warning(f"Maximum retry limit ({max_loops}) reached. Forcing route to human triage.")
        return END
        
    logger.info(f"Critic rejected draft on iteration {iteration}. Looping back to Drafter Agent.")
    return "drafter"

def build_sentinel_graph():
    """
    Builds the cyclical LangGraph StateGraph:
    Orchestrator -> Drafter -> Critic -> [If Failed: Loop to Drafter] -> [If Passed: END]
    """
    workflow = StateGraph(AgentState)
    
    workflow.add_node("orchestrator", orchestrator_node)
    workflow.add_node("drafter", drafter_node)
    workflow.add_node("critic", critic_node)
    
    workflow.add_edge(START, "orchestrator")
    workflow.add_edge("orchestrator", "drafter")
    workflow.add_edge("drafter", "critic")
    
    workflow.add_conditional_edges(
        "critic",
        route_critic_decision,
        {
            "drafter": "drafter",
            END: END
        }
    )
    
    return workflow.compile()

# Pre-compiled executable graph instance
sentinel_pipeline = build_sentinel_graph()
