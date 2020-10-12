import {Map, Set, ValueObject} from "immutable";

export enum Row {
    A, B, C, D, E, F, G, H, I
}

export module Row {
    export function* allValues() {
        yield Row.A
        yield Row.B
        yield Row.C
        yield Row.D
        yield Row.E
        yield Row.F
        yield Row.G
        yield Row.H
        yield Row.I
    }
}

export enum Column {
    One, Two, Three, Four, Five, Six, Seven, Eight, Nine
}

export module Column {

    export function* allValues() {
        yield Column.One
        yield Column.Two
        yield Column.Three
        yield Column.Four
        yield Column.Five
        yield Column.Six
        yield Column.Seven
        yield Column.Eight
        yield Column.Nine
    }

}

export class Position implements ValueObject {

    readonly row: Row;

    readonly column: Column;

    private constructor(row: Row, column: Column) {
        this.row = row
        this.column = column
    }

    public static of(row: Row, column: Column): Position {
        return new Position(row, column)
    }

    public static* all(): IterableIterator<Position> {
        for (const row of Row.allValues()) {
            for (const col of Column.allValues()) {
                yield Position.of(row, col)
            }
        }
    }

    public static pearsOf: Map<Position, Set<Position>> =
        Map<Position, Set<Position>>().withMutations(map => {
            for (const position of Position.all()) {
                map.set(position, Set(position.peers()))
            }
        })


    equals(other: any): boolean {
        if (other instanceof Position) {
            const p = other as Position
            return p.column === this.column && p.row === this.row
        } else {
            return false
        }
    }

    hashCode(): number {
        return this.row.valueOf() * this.column.valueOf() + this.column.valueOf()
    }

    * sameRow(): IterableIterator<Position> {
        for (const column of Column.allValues()) {
            if (!(column === this.column)) {
                yield Position.of(this.row, column)
            }
        }
    }

    * sameColumn(): IterableIterator<Position> {
        for (const row of Row.allValues()) {
            if (!(row === this.row)) {
                yield Position.of(row, this.column)
            }
        }
    }

    * sameSquare(): IterableIterator<Position> {
        const squareCenterRow = Math.trunc(this.row / 3) * 3 + 1
        const squareCenterColumn = Math.trunc(this.column / 3) * 3 + 1
        for (const dRow of [-1, 0, 1]) {
            for (const dCol of [-1, 0, 1]) {
                const checkRow = squareCenterRow + dRow
                const checkCol = squareCenterColumn + dCol

                if (!(checkRow === this.row && checkCol === this.column)) {
                    yield Position.of(checkRow, checkCol)
                }
            }
        }
    }

    * peers(): IterableIterator<Position> {
        yield * this.sameRow()
        yield * this.sameColumn()
        yield * this.sameSquare()
    }

    toString(): string {
        return `(${this.row}-${this.column})`
    }

}
