import {Rule} from "./Rule";
import {Constraints} from "../Constraints";
import {chain, Either, right} from "fp-ts/lib/Either";
import {Position} from "../Position";

export class TwinExclusionRule implements Rule {
    evaluate(constraints: Constraints): Either<String, Constraints> {
        let tmp = right<String, Constraints>(constraints)
        Position.rows.forEach(row => {
            constraints.reverseIndex(row).forEach((possiblePositions, digit) => {
                if (this.allinTheSameSquare(possiblePositions)) {
                    possiblePositions[0].sameSquare().forEach(position => {
                        if (!possiblePositions.includes(position)) {
                            // positions in the square but not in the row
                            tmp = chain((c: Constraints) => c.remove(position, digit))(tmp)
                        }
                    })
                }
            })
        })

        Position.cols.forEach(column => {
            constraints.reverseIndex(column).forEach((possiblePositions, digit) => {
                if (this.allinTheSameSquare(possiblePositions)) {
                    // remove digit from all other squares
                    possiblePositions[0].sameSquare().forEach(position => {
                        if (!possiblePositions.includes(position)) {
                            // positions in the square but not in the column
                            tmp = chain((c: Constraints) => c.remove(position, digit))(tmp)
                        }
                    })
                }
            })
        })
        return tmp
    }

    private allinTheSameSquare(possiblePositions: ReadonlyArray<Position>) {
        if (possiblePositions.length > 1) {
            const square = possiblePositions[0].sameSquare()
            return possiblePositions.slice(1).every(position => square.includes(position))
        } else {
            return false;
        }
    }

}
