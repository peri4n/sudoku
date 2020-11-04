import {Board} from "./Board";
import {List} from "immutable";
import {Rule} from "./rule/Rule";
import {Constraints} from "./Constraints";
import {chain, Either, isRight, left, right} from "fp-ts/lib/Either";


export class Solver {

    public static solve(board: Board, ...rules: Rule[]): Either<String, Constraints> {
        return Solver.solveH(Constraints.initialize(board), ...rules)
    }

    private static applyRules(constraints: Constraints, ...rules: Rule[]): Either<String, Constraints> {
        const constraintsAfterRules = rules.reduce((constraint, rule) => {
            return chain((c: Constraints) => rule.evaluate(c))(constraint)
        }, right<String, Constraints>(constraints))

        if (isRight(constraintsAfterRules)) {
            if (constraintsAfterRules.right.equals(constraints)) {
                return constraintsAfterRules
            } else {
                return this.applyRules(constraintsAfterRules.right, ...rules)
            }
        }

        return constraintsAfterRules
    }

    private static solveH(constraints: Constraints, ...rules: Rule[]): Either<String, Constraints> {
        if (constraints.isFinished()) {
            return right(constraints)
        } else {
            // Apply all rules
            const constraintsAfterRules = this.applyRules(constraints, ...rules)

            // If constraints are still valid
            if (isRight(constraintsAfterRules)) {

                // check if all constraints are solved
                if (constraintsAfterRules.right.isFinished()) {
                    return constraintsAfterRules
                }

                const [position, candidates] = constraintsAfterRules.right.candidates()

                // guess randomly
                for (let candidate of candidates.candidates) {
                    const guess = constraintsAfterRules.right.assign(position, candidate);
                    if (isRight(guess)) {
                        const solveH = this.solveH(guess.right, ...rules);
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
