import {Constraints} from "./Constraints";
import {Digit} from "./Square";
import {Position} from "./Position";
import {Either, isLeft, isRight, left, right} from "fp-ts/lib/Either";

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
                    if (isRight(updatedConstraints)) {
                        updatedConstraints = updatedConstraints.right.remove(pos, solution);
                    } else {
                        // stop as soon as an error occurs
                        updatedConstraints = left("")
                    }
                })
            }
        })

        if (isRight(updatedConstraints)) {
            if (updatedConstraints.right.equals(constraints)) {
                return right(constraints)
            } else {
                return this.evaluate(updatedConstraints.right)
            }
        } else {
            return left("")
        }
    }
}
