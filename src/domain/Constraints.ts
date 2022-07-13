import {Position} from "./Position";
import {Board} from "./Board";
import {Digit} from "./Square";
import {Either, isRight, left, right, tryCatch} from "fp-ts/lib/Either";
import {Candidates} from "./Candidates";

type Const = readonly Candidates[]

export class Constraints {

    private readonly constraints: Const

    private constructor(constraints: Const) {
        this.constraints = constraints
    }

    private static unconstrained(): Constraints {
        return new Constraints(Array<Candidates>(81).fill(Candidates.initialize(), 0))
    }

    static initialize(board: Board): Constraints {
        let constraints = this.unconstrained()
        board.forEach((pos, square) => {
            const step = constraints.assign(pos, square.value)
            if (isRight(step)) {
                constraints = step.right
            } else {
                throw Error("Board is in invalid state.")
            }
        })
        return constraints
    }

    at(position: Position): Candidates {
        return this.constraints[position.toIndex()]
    }

    assign(position: Position, solution: Digit): Either<String, Constraints> {
        const conflicts = Position.peersOf(position)
            .find(position => {
                return this.at(position).solutionIs(solution)
            })

        if (conflicts) {
            return left(`Solving position ${position} with ${solution} conflicts with position ${conflicts}`)
        } else {
            return right(this.mutate(position, () => Candidates.solved(solution)))
        }
    }

    private mutate(position: Position, updater: (c: Candidates) => Candidates): Constraints {
        const newConstraints = Array<Candidates>(81)
        this.constraints.forEach((candidates, index) => {
            if (index === Position.toIndex(position)) {
                newConstraints[index] = updater(candidates)
            } else {
                newConstraints[index] = this.constraints[index]
            }
        })
        return new Constraints(newConstraints)
    }

    remove(position: Position, candidate: Digit): Either<String, Constraints> {
        return tryCatch(() =>
                this.mutate(position, candidates => {
                    const newCandidates = candidates.remove(candidate)
                    if (newCandidates.isInvalid()) {
                        throw Error
                    } else {
                        return newCandidates
                    }
                })
            , () => `Removing ${candidate} from position ${position} leaves one cell with no candidates.`)
    }

    isStricterThan(otherConstraints: Constraints): boolean {
        return this.constraints.every( (candidates, index) => candidates.isStricterThan(otherConstraints.at(Position.fromIndex(index))))
    }

    reverseIndex(positions: ReadonlyArray<Position>): Map<Digit, ReadonlyArray<Position>> {
        const index = new Map<Digit, Array<Position>>()
        positions.forEach(position => {
            const candidates = this.at(position);
            candidates.forEach(candidate => {
                if (index.has(candidate)) {
                    const old = index.get(candidate)!
                    old.push(position)
                } else {
                    index.set(candidate, [position])
                }

            })

        })

        return index
    }

    equals(other: any): boolean {
        if (other instanceof Constraints) {
            const p = other as Constraints
            return p.constraints.find((candidate, index) => !this.constraints[index].equals(candidate)) === undefined;
        } else {
            return false
        }
    }

    solved(): Array<[Position, Digit]> {
        let solutions = Array<[Position, Digit]>()
        this.constraints.forEach((candidate, index) => {
            if (candidate.isSolved()) {
                solutions.push([Position.fromIndex(index), candidate.solution()])
            }

        })
        return solutions
    }

    candidates(): [Position, Candidates] {
        return this.constraints
            .map<[Position, Candidates]>((candidates, index) => [Position.fromIndex(index), candidates])
            .filter(pair => pair[1].isAmbiguous())
            .sort((p1, p2) => p1[1].size() - p2[1].size())[0]
    }

    toString(): string {
        let res = ""
        let index = 1
        for (const position of Position.all) {
            const candidates = this.at(position);
            res += candidates.padded()
            if ((index % 3 === 0) && (index % 9 !== 0)) {
                res += "|"
            }
            if (index % 9 === 0) {
                res += "\n"
            }
            if (index % 27 === 0 && index !== 81) {
                res += ("+" + "-----------".repeat(3)).repeat(3).substr(1) + "\n"
            }

            index += 1
        }

        return res
    }

    isFinished(): boolean {
        return this.constraints
            .find(candidates => candidates.isAmbiguous()) === undefined
    }
}
