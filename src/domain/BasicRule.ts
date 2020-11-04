import {Constraints} from "./Constraints";
import {chain, Either, isRight, left, right} from "fp-ts/lib/Either";
import {Position} from "./Position";
import {Rule} from "./Rule";

export class BasicRule implements Rule {

    evaluate(constraints: Constraints): Either<String, Constraints> {
        const updatedConstraints = constraints.solved().reduce((constraint, solution) => {
            const position = solution[0]
            const digit = solution[1]

            // remove digit in candidates of peers
            return Position.peersOf(position).reduce((constraint, peer) => {
                return chain((c: Constraints) => c.remove(peer, digit))(constraint);
            }, constraint)

        }, right<String, Constraints>(constraints))

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
