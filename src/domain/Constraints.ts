import {Position} from "./Position";
import {Map, Set} from "immutable";
import {Board} from "./Board";
import {Digit} from "./Square";

type Const = Map<Position, Set<Digit>>

export class Constraints {

    private readonly constraints: Const

    private constructor(constraints: Const) {
        if (constraints.find(candidates => candidates.isEmpty())) {
            throw Error("Constraints are in invalid state. A cell has no candidates left.")
        }
        this.constraints = constraints
    }

    private static unconstrained: Constraints = new Constraints(
        Map<Position, Set<Digit>>().withMutations(map => {
            for (const position of Position.all()) {
                map.set(position, Set.of(1, 2, 3, 4, 5, 6, 7, 8, 9))
            }
        }))

    solve(position: Position, solution: Digit): Constraints {
        let tmp = this.withMutations(map => {
            map.set(position, Set.of(solution))
        })

        for (let peer of position.peers()) {
            tmp = tmp.remove(peer, solution)
        }
        
        return tmp
    }

    remove(position: Position, candidate: Digit): Constraints {
        return this.withMutations(map => {
            map.update(position, candidates => candidates.remove(candidate))
        })
    }

    static initialize(board: Board): Constraints {
        return Constraints.unconstrained.withMutations(c => {
            board.forEach((position, square) => c.set(position, Set.of(square.value)))
        })
    }

    equals(other: any): boolean {
        if (other instanceof Constraints) {
            const p = other as Constraints
            return p.constraints.equals(this.constraints)
        } else {
            return false
        }
    }

    withMutations(sideEffect: (c: Const) => any): Constraints {
        return new Constraints(this.constraints.withMutations(sideEffect))
    }

    forEach(sideEffect: (p: Position, c: Set<Digit>) => any): any {
        this.constraints.forEach((value, key) => sideEffect(key, value))
    }

    toString(): string {
        let res = ""
        for (const position of Position.all()) {
            const candidates = this.constraints.get(position)!;
            if (candidates.size === 1) {
                res += candidates.first<Digit>()!
            } else {
                res += "X"
            }
        }
        return res.match(/.{9}/g)!.join('\n')
    }

    isFinished(): boolean {
        return this.constraints
            .count(candidates => candidates.size === 1) === 81
    }
}
