import {Map} from "immutable";

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

export class Position {

    private static readonly a1 = Position.of(Row.A, Column.One)
    private static readonly a2 = Position.of(Row.A, Column.Two)
    private static readonly a3 = Position.of(Row.A, Column.Three)
    private static readonly a4 = Position.of(Row.A, Column.Four)
    private static readonly a5 = Position.of(Row.A, Column.Five)
    private static readonly a6 = Position.of(Row.A, Column.Six)
    private static readonly a7 = Position.of(Row.A, Column.Seven)
    private static readonly a8 = Position.of(Row.A, Column.Eight)
    private static readonly a9 = Position.of(Row.A, Column.Nine)

    private static readonly b1 = Position.of(Row.B, Column.One)
    private static readonly b2 = Position.of(Row.B, Column.Two)
    private static readonly b3 = Position.of(Row.B, Column.Three)
    private static readonly b4 = Position.of(Row.B, Column.Four)
    private static readonly b5 = Position.of(Row.B, Column.Five)
    private static readonly b6 = Position.of(Row.B, Column.Six)
    private static readonly b7 = Position.of(Row.B, Column.Seven)
    private static readonly b8 = Position.of(Row.B, Column.Eight)
    private static readonly b9 = Position.of(Row.B, Column.Nine)

    private static readonly c1 = Position.of(Row.C, Column.One)
    private static readonly c2 = Position.of(Row.C, Column.Two)
    private static readonly c3 = Position.of(Row.C, Column.Three)
    private static readonly c4 = Position.of(Row.C, Column.Four)
    private static readonly c5 = Position.of(Row.C, Column.Five)
    private static readonly c6 = Position.of(Row.C, Column.Six)
    private static readonly c7 = Position.of(Row.C, Column.Seven)
    private static readonly c8 = Position.of(Row.C, Column.Eight)
    private static readonly c9 = Position.of(Row.C, Column.Nine)

    private static readonly d1 = Position.of(Row.D, Column.One)
    private static readonly d2 = Position.of(Row.D, Column.Two)
    private static readonly d3 = Position.of(Row.D, Column.Three)
    private static readonly d4 = Position.of(Row.D, Column.Four)
    private static readonly d5 = Position.of(Row.D, Column.Five)
    private static readonly d6 = Position.of(Row.D, Column.Six)
    private static readonly d7 = Position.of(Row.D, Column.Seven)
    private static readonly d8 = Position.of(Row.D, Column.Eight)
    private static readonly d9 = Position.of(Row.D, Column.Nine)

    private static readonly e1 = Position.of(Row.E, Column.One)
    private static readonly e2 = Position.of(Row.E, Column.Two)
    private static readonly e3 = Position.of(Row.E, Column.Three)
    private static readonly e4 = Position.of(Row.E, Column.Four)
    private static readonly e5 = Position.of(Row.E, Column.Five)
    private static readonly e6 = Position.of(Row.E, Column.Six)
    private static readonly e7 = Position.of(Row.E, Column.Seven)
    private static readonly e8 = Position.of(Row.E, Column.Eight)
    private static readonly e9 = Position.of(Row.E, Column.Nine)

    private static readonly f1 = Position.of(Row.F, Column.One)
    private static readonly f2 = Position.of(Row.F, Column.Two)
    private static readonly f3 = Position.of(Row.F, Column.Three)
    private static readonly f4 = Position.of(Row.F, Column.Four)
    private static readonly f5 = Position.of(Row.F, Column.Five)
    private static readonly f6 = Position.of(Row.F, Column.Six)
    private static readonly f7 = Position.of(Row.F, Column.Seven)
    private static readonly f8 = Position.of(Row.F, Column.Eight)
    private static readonly f9 = Position.of(Row.F, Column.Nine)

    private static readonly g1 = Position.of(Row.G, Column.One)
    private static readonly g2 = Position.of(Row.G, Column.Two)
    private static readonly g3 = Position.of(Row.G, Column.Three)
    private static readonly g4 = Position.of(Row.G, Column.Four)
    private static readonly g5 = Position.of(Row.G, Column.Five)
    private static readonly g6 = Position.of(Row.G, Column.Six)
    private static readonly g7 = Position.of(Row.G, Column.Seven)
    private static readonly g8 = Position.of(Row.G, Column.Eight)
    private static readonly g9 = Position.of(Row.G, Column.Nine)

    private static readonly h1 = Position.of(Row.H, Column.One)
    private static readonly h2 = Position.of(Row.H, Column.Two)
    private static readonly h3 = Position.of(Row.H, Column.Three)
    private static readonly h4 = Position.of(Row.H, Column.Four)
    private static readonly h5 = Position.of(Row.H, Column.Five)
    private static readonly h6 = Position.of(Row.H, Column.Six)
    private static readonly h7 = Position.of(Row.H, Column.Seven)
    private static readonly h8 = Position.of(Row.H, Column.Eight)
    private static readonly h9 = Position.of(Row.H, Column.Nine)

    private static readonly i1 = Position.of(Row.I, Column.One)
    private static readonly i2 = Position.of(Row.I, Column.Two)
    private static readonly i3 = Position.of(Row.I, Column.Three)
    private static readonly i4 = Position.of(Row.I, Column.Four)
    private static readonly i5 = Position.of(Row.I, Column.Five)
    private static readonly i6 = Position.of(Row.I, Column.Six)
    private static readonly i7 = Position.of(Row.I, Column.Seven)
    private static readonly i8 = Position.of(Row.I, Column.Eight)
    private static readonly i9 = Position.of(Row.I, Column.Nine)

    /** All rows */
    private static readonly row1 = [Position.a1, Position.a2, Position.a3, Position.a4, Position.a5, Position.a6, Position.a7, Position.a8, Position.a9]
    private static readonly row2 = [Position.b1, Position.b2, Position.b3, Position.b4, Position.b5, Position.b6, Position.b7, Position.b8, Position.b9]
    private static readonly row3 = [Position.c1, Position.c2, Position.c3, Position.c4, Position.c5, Position.c6, Position.c7, Position.c8, Position.c9]

    private static readonly row4 = [Position.d1, Position.d2, Position.d3, Position.d4, Position.d5, Position.d6, Position.d7, Position.d8, Position.d9]
    private static readonly row5 = [Position.e1, Position.e2, Position.e3, Position.e4, Position.e5, Position.e6, Position.e7, Position.e8, Position.e9]
    private static readonly row6 = [Position.f1, Position.f2, Position.f3, Position.f4, Position.f5, Position.f6, Position.f7, Position.f8, Position.f9]

    private static readonly row7 = [Position.g1, Position.g2, Position.g3, Position.g4, Position.g5, Position.g6, Position.g7, Position.g8, Position.g9]
    private static readonly row8 = [Position.h1, Position.h2, Position.h3, Position.h4, Position.h5, Position.h6, Position.h7, Position.h8, Position.h9]
    private static readonly row9 = [Position.i1, Position.i2, Position.i3, Position.i4, Position.i5, Position.i6, Position.i7, Position.i8, Position.i9]

    public static readonly rows = [Position.row1, Position.row2, Position.row3, Position.row4, Position.row5, Position.row6, Position.row7, Position.row8, Position.row9]

    /** All columns */
    private static readonly col1 = [Position.a1, Position.b1, Position.c1, Position.d1, Position.e1, Position.f1, Position.g1, Position.h1, Position.i1]
    private static readonly col2 = [Position.a2, Position.b2, Position.c2, Position.d2, Position.e2, Position.f2, Position.g2, Position.h2, Position.i2]
    private static readonly col3 = [Position.a3, Position.b3, Position.c3, Position.d3, Position.e3, Position.f3, Position.g3, Position.h3, Position.i3]

    private static readonly col4 = [Position.a4, Position.b4, Position.c4, Position.d4, Position.e4, Position.f4, Position.g4, Position.h4, Position.i4]
    private static readonly col5 = [Position.a5, Position.b5, Position.c5, Position.d5, Position.e5, Position.f5, Position.g5, Position.h5, Position.i5]
    private static readonly col6 = [Position.a6, Position.b6, Position.c6, Position.d6, Position.e6, Position.f6, Position.g6, Position.h6, Position.i6]

    private static readonly col7 = [Position.a7, Position.b7, Position.c7, Position.d7, Position.e7, Position.f7, Position.g7, Position.h7, Position.i7]
    private static readonly col8 = [Position.a8, Position.b8, Position.c8, Position.d8, Position.e8, Position.f8, Position.g8, Position.h8, Position.i8]
    private static readonly col9 = [Position.a9, Position.b9, Position.c9, Position.d9, Position.e9, Position.f9, Position.g9, Position.h9, Position.i9]

    public static readonly cols = [Position.col1, Position.col2, Position.col3, Position.col4, Position.col5, Position.col6, Position.col7, Position.col8, Position.col9]

    /** All squares */
    private static readonly sTL = [Position.a1, Position.a2, Position.a3, Position.b1, Position.b2, Position.b3, Position.c1, Position.c2, Position.c3]
    private static readonly sTM = [Position.a4, Position.a5, Position.a6, Position.b4, Position.b5, Position.b6, Position.c4, Position.c5, Position.c6]
    private static readonly sTR = [Position.a7, Position.a8, Position.a9, Position.b7, Position.b8, Position.b9, Position.c7, Position.c8, Position.c9]

    private static readonly sML = [Position.d1, Position.d2, Position.d3, Position.e1, Position.e2, Position.e3, Position.f1, Position.f2, Position.f3]
    private static readonly sMM = [Position.d4, Position.d5, Position.d6, Position.e4, Position.e5, Position.e6, Position.f4, Position.f5, Position.f6]
    private static readonly sMR = [Position.d7, Position.d8, Position.d9, Position.e7, Position.e8, Position.e9, Position.f7, Position.f8, Position.f9]

    private static readonly sBL = [Position.g1, Position.g2, Position.g3, Position.h1, Position.h2, Position.h3, Position.i1, Position.i2, Position.i3]
    private static readonly sBM = [Position.g4, Position.g5, Position.g6, Position.h4, Position.h5, Position.h6, Position.i4, Position.i5, Position.i6]
    private static readonly sBR = [Position.g7, Position.g8, Position.g9, Position.h7, Position.h8, Position.h9, Position.i7, Position.i8, Position.i9]

    public static readonly squares = [Position.sTL, Position.sTM, Position.sTR, Position.sML, Position.sMM, Position.sMR, Position.sBL, Position.sBM, Position.sBR]

    private static readonly squaresHelper = [
        [Position.sTL, Position.sTM, Position.sTR],
        [Position.sML, Position.sMM, Position.sMR],
        [Position.sBL, Position.sBM, Position.sBR]
    ]

    public static all: Position[] =
        Array().concat(
            Position.row1,
            Position.row2,
            Position.row3,
            Position.row4,
            Position.row5,
            Position.row6,
            Position.row7,
            Position.row8,
            Position.row9
        )

    private static peersCache: Position[][] = Position.memoPears()

    public static peersOf(pos: Position): Position[] {
        return Position.peersCache[pos.toIndex()]
    }

    private static memoPears(): Position[][] {
        return Position.all.map( position => position.peers())
    }

    public static toIndex(pos: Position): number {
        return pos.row  * 9 + pos.column
    }

    public static fromIndex(index: number): Position {
        const col = index % 9
        const row = (index / 9) >> 0
        return Position.of(row, col)
    }

    readonly row: Row;

    readonly column: Column;

    private constructor(row: Row, column: Column) {
        this.row = row
        this.column = column
    }

    public static of(row: Row, column: Column): Position {
        return new Position(row, column)
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
        return this.row.valueOf() * this.column.valueOf() + this.column.valueOf()
    }

    sameRow(include: boolean = false): Position[] {
        if (include) {
            return [...Position.rows[this.row]]
        } else {
            const positions = [...Position.rows[this.row]];
            positions.splice(this.column, 1)
            return positions
        }
    }

    toIndex(): number {
        return Position.toIndex(this)
    }

    sameColumn(include: boolean = false): Position[] {
        if (include) {
            return [...Position.cols[this.column]]
        } else {
            const positions = [...Position.cols[this.column]]
            positions.splice(this.row, 1)
            return positions
        }
    }

    sameSquare(include: boolean = false): Position[] {
        const rowIndex = Math.trunc(this.row / 3)
        const colIndex = Math.trunc(this.column / 3)
        if (include) {
            return Position.squaresHelper[rowIndex][colIndex]
        } else {
            return Position.squaresHelper[rowIndex][colIndex].filter(pos => !pos.equals(this))
        }
    }

    peers(): Position[] {
        const merge = Array().concat(
            this.sameRow(),
            this.sameColumn(),
            this.sameSquare());

        // de-duplicate
        return merge
            .filter((item, pos) => merge.indexOf(item) === pos)
    }

    toString(): string {
        return `(${this.row}${this.column})`
    }
}
