import {Position} from "./Position";
import {Map, Set} from "immutable";
import {Board} from "./Board";
import {Digit} from "./Square";
import {Either, left, right, tryCatch} from "fp-ts/lib/Either";

type Const = Map<Position, Set<Digit>>

export class Constraints {

    private readonly constraints: Const

    private constructor(constraints: Const) {
        this.constraints = constraints
    }

    private static unconstrained: Constraints = new Constraints(
        Map<Position, Set<Digit>>().withMutations(map => {
            for (const position of Position.all) {
                map.set(position, Set.of(1, 2, 3, 4, 5, 6, 7, 8, 9))
            }
        }))

    static initialize(board: Board): Constraints {
        return Constraints.unconstrained.withMutations(c => {
            board.forEach((position, square) => c.set(position, Set.of(square.value)))
        })
    }

    assign(position: Position, solution: Digit): Either<String, Constraints> {
        const conflicts = Position.pearsOf.get(position)!
            .find(position => {
                const candidates = this.constraints.get(position)!
                return candidates.size === 1 && candidates.contains(solution)
            })

        if (conflicts) {
            return left(`Solving position ${position} with ${solution} conflicts with position ${conflicts}`)
        } else {
            return right(this.withMutations(map => {
                map.set(position, Set.of(solution))
            }))
        }
    }

    remove(position: Position, candidate: Digit): Either<String, Constraints> {
        return tryCatch(() =>
                new Constraints(this.constraints.update(position, candidates => {
                    const newCandidates = candidates.remove(candidate)
                    if (newCandidates.isEmpty()) {
                        throw Error
                    } else {
                        return newCandidates
                    }
                }))
            , () => `Removing ${candidate} from position ${position} leaves one cell with no candidates.`)
    }

    reverseIndex(positions: Set<Position>): Map<Digit, Set<Position>> {
        return Map<Digit, Set<Position>>().withMutations(map => {
            positions.forEach(position => {
                const candidates = this.constraints.get(position)!;
                candidates.forEach(candidate => {
                    if (map.get(candidate) === undefined) {
                        map.set(candidate, Set.of(position))
                    } else {
                        map.set(candidate, map.get(candidate)!.update(positions => positions.add(position)))
                    }
                })
            })
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

    private withMutations(sideEffect: (c: Const) => any): Constraints {
        return new Constraints(this.constraints.withMutations(sideEffect))
    }

    solved(): Set<[Position, Digit]> {
        return Set(this.constraints
            .filter(candidates => candidates.size === 1)
            .map<Digit>((candidates) => candidates.first<Digit>()!))
    }

    candidates(): [Position, Set<Digit>] {
        return Array.from(this.constraints
            .filter(candidates => candidates.size > 1)
            .sortBy(candidates => candidates.size))[0]
    }

    toString(): string {
        let res = ""
        for (const position of Position.all) {
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
            .find(candidates => candidates.size > 1) === undefined
    }
}
