import {Digit} from "./Square";

export class Candidates {

    public readonly candidates: readonly Digit[]

    constructor(candidates: Digit[]) {
        this.candidates = candidates;
    }

    static initialize(): Candidates {
        return new Candidates([1, 2, 3, 4, 5, 6, 7, 8, 9])
    }

    static solved(solution: Digit): Candidates {
        return new Candidates([solution])
    }

    private static arrayMatch(arr1: readonly Digit[], arr2: readonly Digit[]): Boolean {

        // Check if the arrays are the same length
        if (arr1.length !== arr2.length) return false;

        // Check if all items exist and are in the same order
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }

        // Otherwise, return true
        return true;

    }

    remove(candidate: Digit): Candidates {
        const index = this.candidates.indexOf(candidate);
        if (index === -1) {
            return this
        } else {
            const candidates = [...this.candidates]
            candidates.splice(index, 1)
            return new Candidates(candidates)
        }
    }

    forEach(sideEffect: (d: Digit) => any): void {
        for (const candidate of this.candidates) {
            sideEffect(candidate)
        }
    }

    equals(other: any): Boolean {
        if (other instanceof Candidates) {
            return Candidates.arrayMatch(this.candidates, other.candidates)
        } else {
            return false
        }
    }

    solutionIs(candidate: Digit): Boolean {
        return this.isSolved() && this.solution() === candidate
    }

    size(): number {
        return this.candidates.length
    }

    solution(): Digit {
        return this.candidates[0]
    }

    isInvalid(): boolean {
        return this.candidates.length === 0
    }

    isSolved(): boolean {
        return this.candidates.length === 1
    }

    isAmbiguous(): boolean {
        return this.candidates.length > 1
    }

    toString(): string {
            return `[${this.candidates.join('')}]`
    }
    padded(): string {
        return `[${this.candidates.join('').padStart(9,' ')}]`
    }
}
