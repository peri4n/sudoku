import {Constraints} from "./Constraints";
import {Position, Row} from "./Position";
import {chain, Either, isRight, left, right} from "fp-ts/lib/Either";

export interface Rule {

    evaluate(constraints: Constraints): Either<String, Constraints>

}

export class BasicRule implements Rule {

    evaluate(constraints: Constraints): Either<String, Constraints> {
        const updatedConstraints = constraints.solved().reduce((constraint, solution) => {
            const position = solution[0]
            const digit = solution[1]

            // remove digit in candidates of peers
            return Position.pearsOf.get(position)!.reduce((constraint, peer) => {
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

export class SinglePossibility implements Rule {
    evaluate(constraints: Constraints): Either<String, Constraints> {
        let tmp = right<String, Constraints>(constraints)
        Position.rows.forEach(row => {
            constraints.reverseIndex(row)
                .filter(possiblePositions => possiblePositions.size === 1)
                .forEach((possiblePositions, digit) => {
                    tmp = chain((c: Constraints) => c.assign(possiblePositions.first<Position>(), digit))(tmp)
                })
        })

        Position.cols.forEach(column => {
            constraints.reverseIndex(column)
                .filter(possiblePositions => possiblePositions.size === 1)
                .forEach((possiblePositions, digit) => {
                    tmp = chain((c: Constraints) => c.assign(possiblePositions.first<Position>(), digit))(tmp)
                })
        })

        Position.squares.forEach(square => {
            constraints.reverseIndex(square)
                .filter(possiblePositions => possiblePositions.size === 1)
                .forEach((possiblePositions, digit) => {
                    tmp = chain((c: Constraints) => c.assign(possiblePositions.first<Position>(), digit))(tmp)
                })
        })

        return  tmp
    }

}
