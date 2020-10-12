import {Board} from "../../src/domain/Board";
import {Constraints} from "../../src/domain/Constraints";
import '@relmify/jest-fp-ts';
import {Column, Position, Row} from "../../src/domain/Position";

describe('Constraints', function () {

    it('can be initialized', () => {
        const board = Board.parse("003020600900305001001806400008102900700000008006708200002609500800203009005010300")
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            return !Constraints.initialize(board).isFinished();
        }))
    })

    it('can detect invalid states', () => {
        const board = Board.parse("003020600900305001001806400008102900700000008006708200002609500800203009005010300")
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            expect(() => Constraints.initialize(board).solve(Position.of(Row.A, Column.Two), 3))
                .toThrowError(Error("Constraints are in invalid state. A cell has no candidates left."))
            return true
        }))
    })

});