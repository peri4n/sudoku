export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export class Square {

    public readonly value: Digit

    public readonly mutable: boolean

    private constructor(value: Digit, mutable: boolean = false) {
        this.value = value
        this.mutable = mutable
    }

    isMutable(): boolean {
        return this.mutable
    }

    static withVal(value: Digit): Square {
        return new Square(value)
    }

    static prefilled(value: Digit): Square {
        return new Square(value, true)
    }

    hasVal(n: Digit): boolean {
        if (this.value) {
            return this.value === n
        } else {
            return false;
        }
    }
}
