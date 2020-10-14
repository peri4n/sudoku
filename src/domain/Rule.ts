import {Constraints} from "./Constraints";
import {Digit} from "./Square";
import {Position} from "./Position";
import {chain, Either, isRight, left, right} from "fp-ts/lib/Either";
import {pipe} from "fp-ts/lib/function";

export interface Rule {

    evaluate(constraints: Constraints): Either<String, Constraints>

}

export class BasicRule implements Rule {

    evaluate(constraints: Constraints): Either<String, Constraints> {
        let updatedConstraints: Either<String, Constraints> = right(constraints)
        constraints.solved().forEach(solution => {
            const position = solution[0]
            const digit = solution[1]

            // remove digit in candidates of peers
            for (const peer of Position.pearsOf.get(position)!) {
                updatedConstraints = chain((c: Constraints) => c.remove(peer, digit))(updatedConstraints);
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
