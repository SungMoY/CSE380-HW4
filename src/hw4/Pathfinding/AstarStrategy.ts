import List from "../../Wolfie2D/DataTypes/Collections/List";
import Stack from "../../Wolfie2D/DataTypes/Collections/Stack";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";
import NavPathStrat from "../../Wolfie2D/Pathfinding/Strategies/NavigationStrategy";
import GraphUtils from "../../Wolfie2D/Utils/GraphUtils";

// TODO letruct a NavigationPath object using A*
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

        let start = this.mesh.graph.snap(from)
        let end = this.mesh.graph.snap(to)
        let openList = [start]
        let closedList = []
        let data = {}
        let parent = {}

        data[start] = { g: 0, h: 0, f: 0 };
        parent[start] = -1;

        while (openList.length > 0) {
            // Sort openList by f score
            openList.sort((a, b) => data[a].f - data[b].f);
            let current = openList.shift();

        
            if (current == end) {
                // Reconstruct path
                console.log("PATH FOUND")
                return new NavigationPath(this.endAlgo(parent, end));
            }
        
            let neighbors = this.getNeighbors(current);
            if (neighbors.length < 3) continue;
            for (let neighbor of neighbors) {

                if (closedList.includes(neighbor)) continue;
            
                let newPathToNeighbor = data[current].g + this.getWeight(current, neighbor);

                if (newPathToNeighbor < data[neighbor]?.g || !openList.includes(neighbor)) {
                    data[neighbor] = { g: newPathToNeighbor, h: this.heuristic(neighbor, end), f: newPathToNeighbor + this.heuristic(neighbor, end) };

                    parent[neighbor] = current;

                    openList.push(neighbor);
                    
                }
            }
            closedList.push(current);
        }
        
        // No path found
        console.log("NO PATH FOUND")
        return new NavigationPath(new Stack());    
    }

    // returns an array of the neighbors of a node
    private getNeighbors(node) {
        let neighbors = []
        let edges = this.mesh.graph.getEdges(node)
        neighbors.push(edges.y)
        while (edges.next !== null) {
            edges = edges.next
            neighbors.push(edges.y)

        }
        return neighbors
    }

    // returns the weight of an edge between two nodes
    // this always gives 8 in this case bc that is the length of each tile
    private getWeight(node1, node2) {
        let edges = this.mesh.graph.getEdges(node1)
        while (edges.next !== null) {
            if (edges.y === node2) {
                // square then square root to get positive number
                return Math.sqrt(edges.weight*edges.weight)
            }
            edges = edges.next
        }
        return 0
    }

    // returns the heuristic value of a node
    private heuristic(node, end) {
        let nodePos = this.mesh.graph.getNodePosition(node)
        let endPos = this.mesh.graph.getNodePosition(end)
        let distX = Math.abs(nodePos.x - endPos.x)
        let distY = Math.abs(nodePos.y - endPos.y)
        
        // return manhattan distance
        return distX + distY
    }

    // creates the path stack for this function to return using parents
    private endAlgo(parent, end): Stack<Vec2> {
        console.log("CONSTRUCTING PATH")
        let path = new Stack<Vec2>(this.mesh.graph.numVertices)
        let current = end
        while (current !== -1) {
            path.push(this.mesh.graph.getNodePosition(current))
            current = parent[current]
        }
        return path
    }
}