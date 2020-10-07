import {Board} from "./Board";
import {List} from "immutable";
import {Rule} from "./Rule";
import {Constraints} from "./Constraints";


export class Solver {

    public static solve(board: Board, rules: List<Rule>): Constraints {
        return Solver.solveH(rules, Constraints.initialize(board))
    }

    private static solveH(rules: List<Rule>, constraints: Constraints): Constraints {
        if (constraints.isFinished()) {
            return constraints
        } else {
            let tmp = constraints
            rules.forEach( rule => {
                tmp = rule.evaluate(tmp)
                if (tmp.isFinished()) {
                    return tmp
                }
            })

            return this.solveH(rules, tmp)
        }
    }
}
