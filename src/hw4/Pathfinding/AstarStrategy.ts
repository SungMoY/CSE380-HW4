import Stack from "../../Wolfie2D/DataTypes/Collections/Stack";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";
import NavPathStrat from "../../Wolfie2D/Pathfinding/Strategies/NavigationStrategy";
import GraphUtils from "../../Wolfie2D/Utils/GraphUtils";
import AstarNode from "./AstarNode";

// TODO Construct a NavigationPath object using A*
/**
 * All nodes have G: min distance from origin node (A) to this node, and H: estimate distance to goal node
 * The key is the minimize G + H to get the shortest, best path
 * 1. Place origin node (A) in OPENLIST
 * 2. Look at all adjacent nodes for A
 *       add them to OPENLIST with A as its parent
 *       remove A from OPENLIST and add it to CLOSEDLIST
 *       remove node (B) with minimum (G+H) from OPENLIST and add it to CLOSEDLIST
 * 3. Look at all adjacent nodes for B that are not in CLOSEDLIST
 *       add them to OPENLIST with B as its parent
 *       Find node (C) with minimum distance(G+H)
 *       if (C) is already in OPENLIST, ignore node (B)
 *  Repeat
 *  The path to return is the contents of CLOSEDLIST
 */

/**
 * The AstarStrategy class is an extension of the abstract NavPathStrategy class. For our navigation system, you can
 * now specify and define your own pathfinding strategy. Originally, the two options were to use Djikstras or a
 * direct (point A -> point B) strategy. The only way to change how the pathfinding was done was by hard-coding things
 * into the classes associated with the navigation system. 
 * 
 * - Peter
 */
export default class AstarStrategy extends NavPathStrat {

    /**
     * @see NavPathStrat.buildPath()
     */
    public buildPath(to: Vec2, from: Vec2): NavigationPath {
        let openList = [];
        let closedList = [];
        // Get the closest nodes in the graph to our to and from positions
        let start = this.mesh.graph.snap(from);
		let end = this.mesh.graph.snap(to);

        openList.push()
        this.calcHeuristic(start, end);


        return new NavigationPath(new Stack<Vec2>());
    }

    // start and end are Nodes in this.mesh.graph that closely correlate with positions
    private calcHeuristic(start: number, end: number): number {
        // calculate the estimated distance from start to end
        // need to take into account obstacles and walls

        // the graph has edges that are distances between nodes
        let edges = this.mesh.graph.getEdges(start);
        while (edges.next !== null) {
            console.log(this.mesh.graph.getNodePosition(start)+
            " is "+ edges.weight+
            " to "+this.mesh.graph.getNodePosition(edges.y));
            edges = edges.next;
        }

        return 0;
    }
}