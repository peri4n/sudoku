import {Position} from "./Position";
import {Map, Set} from "immutable";
import {Board} from "./Board";
import {Digit} from "./Square";

type Const = Map<Position, Set<Digit>>

export class Constraints {

    private readonly constraints: Const

    private constructor(constraints: Const) {
        this.constraints = constraints
    }

    private static unconstrained: Constraints = new Constraints(
        Map(
            Position.all
                .map(position => ([position, Set.of(1, 2, 3, 4, 5, 6, 7, 8, 9)] as [Position, Set<Digit>]))))

    static initialize(board: Board): Constraints {
        return Constraints.unconstrained.withMutations(c => {
            board.forEach((position, square) => c.set(position, Set.of(square.value)))
        })
    }

    withMutations(sideEffect: (c: Const) => any): Constraints {
        return new Constraints(this.constraints.withMutations(sideEffect))
    }

    forEach(sideEffect: (p: Position, c: Set<Digit>) => any): any {
        this.constraints.forEach((value, key) => sideEffect(key, value))
    }

    toString(): string {
        let res = ""
        Position.all.forEach(pos => {
            const candidates = this.constraints.get(pos)!;
            if (candidates.size === 1) {
                res += candidates.first<Digit>()!
            } else {
                res += "X"
            }
        })
        return res.match(/.{9}/g)!.join('\n')
    }

    isFinished(): boolean {
        return this.constraints
            .count(candidates => candidates.size === 1) === 81
    }
}
