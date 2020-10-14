import {Constraints} from "./Constraints";
import {Digit} from "./Square";
import {Position} from "./Position";
import {chain, Either, isLeft, isRight, left, right} from "fp-ts/lib/Either";

export interface Rule {

    evaluate(constraints: Constraints): Either<String, Constraints>

}

export class BasicRule implements Rule {

    evaluate(constraints: Constraints): Either<String, Constraints> {
        let updatedConstraints: Either<String, Constraints> = right(constraints.copy())
        constraints.forEach((position, candidates) => {
            // if already solved
            if (candidates.size === 1) {
                const solution = candidates.first<Digit>()!;
                // remove digit in candidates of peers
                Position.pearsOf.get(position)!.forEach(pos => {
                    updatedConstraints = chain((c: Constraints) => c.remove(pos, solution))(updatedConstraints);
                })
            }
        })

        if (isRight(updatedConstraints)) {
            if (updatedConstraints.right.equals(constraints)) {
                // nothing else to do
                return right(constraints)
            } else {
                // it might be worth to evaluate the rule a second time
                return this.evaluate(updatedConstraints.right)
            }
        } else {
            return left("Applying basic Sudoku rules lead to an error.")
        }
    }
}
