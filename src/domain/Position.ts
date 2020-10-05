import assert from "assert";
import {OrderedSet, Set, ValueObject} from "immutable";
import {Board} from "./Board";

export class Position implements ValueObject {

    readonly row: number;

    readonly column: number;

    private constructor(row: number, column: number) {
        this.row = row
        this.column = column
    }

    public static of(row: number, column: number): Position {
        assert(0 <= row && row < Board.DIM, `Rows have to be in [0,8] but was: ${row}`)
        assert(0 <= column && column < Board.DIM, `Columns have to be in [0,8] but was: ${column}`)
        return new Position(row, column)
    }

    public static all(): OrderedSet<Position> {
        return OrderedSet<Position>().withMutations(s => {
            for (let row = 0; row < Board.DIM; row++) {
                for (let column = 0; column < Board.DIM; column++) {
                    s.add(Position.of(row, column))
                }
            }
        })
    }

    equals(other: any): boolean {
        if (other instanceof Position) {
            const p = other as Position
            return p.column === this.column && p.row === this.row
        } else {
            return false
        }
    }

    hashCode(): number {
        return 31 * this.row + this.column
    }

    public sameRow(): Set<Position> {
        return Set<Position>().withMutations(s => {
                for (let column = 0; column < Board.DIM; column++) {
                    if (!(column === this.column)) {
                        s.add(Position.of(this.row, column))
                    }
                }
                return s
            }
        );
    }

    public sameColumn(): Set<Position> {
        return Set<Position>().withMutations(s => {
                for (let row = 0; row < Board.DIM; row++) {
                    if (!(row === this.row)) {
                        s.add(Position.of(row, this.column))
                    }
                }
                return s
            }
        );
    }

    public sameSquare(): Set<Position> {
        const squareCenterRow = Math.trunc(this.row / 3) * 3 + 1
        const squareCenterColumn = Math.trunc(this.column / 3) * 3 + 1
        return Set<Position>().withMutations(s => {
                for (const dRow of [-1, 0, 1]) {
                    for (const dCol of [-1, 0, 1]) {
                        const checkRow = squareCenterRow + dRow
                        const checkCol = squareCenterColumn + dCol

                        if (!(checkRow === this.row && checkCol === this.column)) {
                            s.add(Position.of(checkRow, checkCol))
                        }
                    }
                }
            }
        )
    }

    public peers(): Set<Position> {
        return Set.union([
            this.sameRow(),
            this.sameColumn(),
            this.sameSquare()
        ])
    }

}
