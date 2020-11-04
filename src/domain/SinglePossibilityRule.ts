import {Constraints} from "./Constraints";
import {chain, Either, right} from "fp-ts/lib/Either";
import {Rule} from "./Rule";
import {Position} from "./Position";
import {Digit} from "./Square";

export class SinglePossibilityRule implements Rule {
    evaluate(constraints: Constraints): Either<String, Constraints> {
        let tmp = right<String, Constraints>(constraints)
        Position.rows.forEach(row => {
            constraints.reverseIndex(row)
                .forEach((possiblePositions: ReadonlyArray<Position>, digit: Digit) => {
                    if (possiblePositions.length === 1) {
                        tmp = chain((c: Constraints) => c.assign(possiblePositions[0], digit))(tmp)
                    }
                })
        })

        Position.cols.forEach(column => {
            constraints.reverseIndex(column)
                .forEach((possiblePositions: ReadonlyArray<Position>, digit: Digit) => {
                    if (possiblePositions.length === 1) {
                        tmp = chain((c: Constraints) => c.assign(possiblePositions[0], digit))(tmp)
                    }
                })
        })

        Position.squares.forEach(square => {
            constraints.reverseIndex(square)
                .forEach((possiblePositions: ReadonlyArray<Position>, digit: Digit) => {
                    if (possiblePositions.length === 1) {
                        tmp = chain((c: Constraints) => c.assign(possiblePositions[0], digit))(tmp)
                    }
                })
        })

        return tmp
    }

}
