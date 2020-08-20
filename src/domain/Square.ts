import {isSome, none, Option, some} from "fp-ts/lib/Option";

export class Square {

    private readonly value: Option<number>

    private readonly mutable: boolean

    private constructor(value: Option<number>, mutable: boolean = false) {
        this.value = value
        this.mutable = mutable
    }

    isMutable(): boolean {
        return this.mutable
    }

    val(): Option<number> {
        return this.value;
    }

    str(): string {
        if (isSome(this.value)) {
            return String(this.value.value)
        } else {
            return ""
        }
    }

    static withVal(value: number): Square {
        return new Square(some(value))
    }

    static prefilled(value: number): Square {
        return new Square(some(value), true)
    }

    hasVal(n: number): boolean {
        if (isSome(this.value)) {
            return this.value.value === n
        } else {
            return false;
        }
    }

    static readonly empty: Square = new Square(none)
}
