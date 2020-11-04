import {Column, Position, Row} from "../../src/domain/Position";

describe('Position', () => {

    it('list all positions on the board', () => {
        expect(Array.from(Position.all)).toBeArrayOfSize(81);
    })

    it('list all positions in the same row', () => {
        for (let row of Row.allValues()) {
            expect(Array.from(Position.of(row, 0).sameRow())).toContainAllValues(
                [
                    Position.of(row, 1),
                    Position.of(row, 2),
                    Position.of(row, 3),
                    Position.of(row, 4),
                    Position.of(row, 5),
                    Position.of(row, 6),
                    Position.of(row, 7),
                    Position.of(row, 8)
                ]
            )
        }
    })

    it('list all positions in the same column', () => {
        for (let col of Column.allValues()) {
            expect(Array.from(Position.of(0, col).sameColumn())).toContainAllValues(
                [
                    Position.of(1, col),
                    Position.of(2, col),
                    Position.of(3, col),
                    Position.of(4, col),
                    Position.of(5, col),
                    Position.of(6, col),
                    Position.of(7, col),
                    Position.of(8, col)
                ]
            )
        }
    })

    it('list all positions in the same square', () => {
        expect(Array.from(Position.of(0, 0).sameSquare())).toContainAllValues(
            [
                Position.of(0, 1),
                Position.of(0, 2),
                Position.of(1, 0),
                Position.of(1, 1),
                Position.of(1, 2),
                Position.of(2, 0),
                Position.of(2, 1),
                Position.of(2, 2)
            ]
        )
    })

    it('list all peer positions', () => {
        expect(Position.peersOf(Position.of(4, 5))).toContainAllValues(
            [
                // same row
                Position.of(4, 0),
                Position.of(4, 1),
                Position.of(4, 2),
                Position.of(4, 3),
                Position.of(4, 4),
                Position.of(4, 6),
                Position.of(4, 7),
                Position.of(4, 8),

                // same col
                Position.of(0, 5),
                Position.of(1, 5),
                Position.of(2, 5),
                Position.of(3, 5),
                Position.of(5, 5),
                Position.of(6, 5),
                Position.of(7, 5),
                Position.of(8, 5),

                // same square
                Position.of(3, 3),
                Position.of(3, 4),
                Position.of(5, 3),
                Position.of(5, 4),
            ]
        )
    })

    it('can be converted to an index', () => {
        expect(Position.toIndex(Position.of(Row.A, Column.One))).toBe(0)
        expect(Position.toIndex(Position.of(Row.A, Column.Two))).toBe(1)
        expect(Position.toIndex(Position.of(Row.A, Column.Three))).toBe(2)

        expect(Position.toIndex(Position.of(Row.B, Column.One))).toBe(9)
        expect(Position.toIndex(Position.of(Row.B, Column.Two))).toBe(10)
        expect(Position.toIndex(Position.of(Row.B, Column.Three))).toBe(11)
    })

    it('can be derived from an index', () => {
        expect(Position.fromIndex(0)).toEqual(Position.of(Row.A, Column.One))
        expect(Position.fromIndex(1)).toEqual(Position.of(Row.A, Column.Two))
        expect(Position.fromIndex(2)).toEqual(Position.of(Row.A, Column.Three))

        expect(Position.fromIndex(9)).toEqual(Position.of(Row.B, Column.One))
        expect(Position.fromIndex(10)).toEqual(Position.of(Row.B, Column.Two))
        expect(Position.fromIndex(11)).toEqual(Position.of(Row.B, Column.Three))
    })
})
