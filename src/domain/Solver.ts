import {Board} from "./Board";
import {List} from "immutable";
import {Rule} from "./Rule";
import {Constraints} from "./Constraints";
import {Either, isLeft, isRight, left, right} from "fp-ts/lib/Either";


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
                if (tmp.right.isFinished()) {
                    return tmp
                }

                const [position, candidates] = tmp.right.candidates()

                // try pick candidates randomly
                for (const candidate of candidates) {
                    const constraints1 = tmp.right.solve(position, candidate);
                    if (isRight(constraints1)) {
                        const solveH = this.solveH(rules, constraints1.right);
                        if (isRight(solveH)) {
                            return solveH
                        }
                    }
                }

                // no pick worked so we abort
                return left('Dead branch')
            } else {
                return left('Dead branch')
            }
        }
    }
}
