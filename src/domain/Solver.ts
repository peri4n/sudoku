import {Board} from "./Board";
import {List} from "immutable";
import {Rule} from "./Rule";
import {Constraints} from "./Constraints";
import {chain, Either, isRight, left, right} from "fp-ts/lib/Either";


export class Solver {

    public static solve(board: Board, rules: List<Rule>): Either<String, Constraints> {
        return Solver.solveH(rules, Constraints.initialize(board))
    }

    private static solveH(rules: List<Rule>, constraints: Constraints): Either<String, Constraints> {
        if (constraints.isFinished()) {
            return right(constraints)
        } else {
            // Apply all rules
            const constraintsAfterRules = rules.reduce((constraint, rule) => {
                return chain((c: Constraints) => rule.evaluate(c))(constraint)
            }, right<String, Constraints>(constraints))

            // If constraints are still valid
            if (isRight(constraintsAfterRules)) {

                // check if all constraints are solved
                if (constraintsAfterRules.right.isFinished()) {
                    return constraintsAfterRules
                }

                //
                const [position, candidates] = constraintsAfterRules.right.candidates()

                // guess randomly
                for (const candidate of candidates) {
                    const guess = constraintsAfterRules.right.assign(position, candidate);
                    if (isRight(guess)) {
                        const solveH = this.solveH(rules, guess.right);
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
