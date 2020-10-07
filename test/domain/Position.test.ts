import {Position} from "../../src/domain/Position";
import {Set} from "immutable";
import {Board} from "../../src/domain/Board";

describe('Position', () => {

    it('list all positions on the board', () => {
        expect(Position.all.size).toEqual(81);
    })

    it('list all positions in the same row', () => {
        for (let row = 0; row < Board.DIM; row++) {
            expect(Position.of(row, 0).sameRow()).toStrictEqual(
                Set<Position>([
                    Position.of(row, 1),
                    Position.of(row, 2),
                    Position.of(row, 3),
                    Position.of(row, 4),
                    Position.of(row, 5),
                    Position.of(row, 6),
                    Position.of(row, 7),
                    Position.of(row, 8)
                ])
            )
        }
    })

    it('list all positions in the same column', () => {
        for (let col = 0; col < Board.DIM; col++) {
            expect(Position.of(0, col).sameColumn()).toStrictEqual(
                Set<Position>([
                    Position.of(1, col),
                    Position.of(2, col),
                    Position.of(3, col),
                    Position.of(4, col),
                    Position.of(5, col),
                    Position.of(6, col),
                    Position.of(7, col),
                    Position.of(8, col)
                ])
            )
        }
    })

    it('list all positions in the same square', () => {
        expect(Position.of(0, 0).sameSquare()).toStrictEqual(
            Set<Position>([
                Position.of(0, 1),
                Position.of(0, 2),
                Position.of(1, 0),
                Position.of(1, 1),
                Position.of(1, 2),
                Position.of(2, 0),
                Position.of(2, 1),
                Position.of(2, 2)
            ])
        )
    })

    it('list all peer positions', () => {
        expect(Position.of(4, 5).peers()).toStrictEqual(
            Set<Position>([
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
                Position.of( 0, 5),
                Position.of( 1, 5),
                Position.of( 2, 5),
                Position.of( 3, 5),
                Position.of( 5, 5),
                Position.of( 6, 5),
                Position.of( 7, 5),
                Position.of( 8, 5),

                // same square
                Position.of( 3, 3),
                Position.of( 3, 4),
                Position.of( 3, 5),
                Position.of( 4, 4),
                Position.of( 4, 6),
                Position.of( 5, 3),
                Position.of( 5, 4),
                Position.of( 5, 5)
            ])
        )

    })
})
