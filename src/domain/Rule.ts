import {Constraints} from "./Constraints";
import {Digit} from "./Square";
import {Position} from "./Position";

export interface Rule {

    evaluate(constraints: Constraints): Constraints

}

export class BasicRule implements Rule {

    evaluate(constraints: Constraints): Constraints {
        return constraints.withMutations(map => {
            constraints.forEach((position, candidates) => {
                // if already solved
                if (candidates.size === 1) {
                    const solution = candidates.first<Digit>()!;
                    // remove digit in candidates of peers
                    Position.pearsOf.get(position)!.forEach(pos => {
                        map.update(pos, can => can.remove(solution))
                    })
                }
            })
        })
    }
}
