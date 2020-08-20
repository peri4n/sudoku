import assert from "assert";
import {hash, ValueObject} from "immutable";

export class Position implements ValueObject {

    readonly row: number;

    readonly column: number;

    private constructor(row: number, column: number) {
        this.row = row
        this.column = column
    }

    public static of(row: number, column: number): Position {
        assert(0 <= row && row <= 8, "Rows have to be in [0,8]")
        assert(0 <= column && column <= 8, "Columns have to be in [0,8]")
        return new Position(row, column)
    }

    equals(other: any): boolean {
        if (other instanceof Position) {
            const p = other as Position
            return p.column === this.column && p.row === this.row
        } else {
            return false;
        }
    }

    hashCode(): number {
        return 31 * this.row + this.column;
    }

}
