import assert from "assert";
import {Map, OrderedSet, Set, ValueObject} from "immutable";

export class Position implements ValueObject {

    readonly row: number;

    readonly column: number;

    private constructor(row: number, column: number) {
        this.row = row
        this.column = column
    }

    public static of(row: number, column: number): Position {
        assert(0 <= row && row < 9, `Rows have to be in [0,8] but was: ${row}`)
        assert(0 <= column && column < 9, `Columns have to be in [0,8] but was: ${column}`)
        return new Position(row, column)
    }

    public static all: OrderedSet<Position> =
        OrderedSet<Position>().withMutations(s => {
            for (let row = 0; row < 9; row++) {
                for (let column = 0; column < 9; column++) {
                    s.add(Position.of(row, column))
                }
            }
        })

    public static pearsOf: Map<Position, Set<Position>> =
        Map<Position, Set<Position>>(Position.all.map(pos => [pos, pos.peers()]))


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

    sameRow(): Set<Position> {
        return Set<Position>().withMutations(s => {
                for (let column = 0; column < 9; column++) {
                    if (!(column === this.column)) {
                        s.add(Position.of(this.row, column))
                    }
                }
                return s
            }
        );
    }

    sameColumn(): Set<Position> {
        return Set<Position>().withMutations(s => {
                for (let row = 0; row < 9; row++) {
                    if (!(row === this.row)) {
                        s.add(Position.of(row, this.column))
                    }
                }
                return s
            }
        );
    }

    sameSquare(): Set<Position> {
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

    peers(): Set<Position> {
        return Set.union([
            this.sameRow(),
            this.sameColumn(),
            this.sameSquare()
        ])
    }

    toString(): string {
        return `(${this.row}-${this.column})`
    }

}
