import {Board} from "./Board";
import {List} from "immutable";
import {Rule} from "./Rule";
import {Constraints} from "./Constraints";
import {Either, isRight, left, right} from "fp-ts/lib/Either";


export class Solver {

    public static solve(board: Board, rules: List<Rule>): Either<String, Constraints> {
        return Solver.solveH(rules, Constraints.initialize(board))
    }

    private static solveH(rules: List<Rule>, constraints: Constraints): Either<String, Constraints> {
        if (constraints.isFinished()) {
            return right(constraints)
        } else {
            let tmp: Either<String, Constraints> = right(constraints)
            rules.forEach(rule => {
                if (isRight(tmp)) {
                    tmp = rule.evaluate(tmp.right)
                }
            })

            if (isRight(tmp)) {
                return this.solveH(rules, tmp.right)
            } else {
                return left("Unable to solve the board")
            }
        }
    }
}
