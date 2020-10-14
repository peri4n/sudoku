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
            const constraints = Constraints.initialize(board).solve(Position.of(Row.A, Column.Two), 3);
            expect(constraints).toBeLeft()
            return true
        }))
    })

    it('can compare identical constraints', () => {
        const board = Board.parse("003020600900305001001806400008102900700000008006708200002609500800203009005010300")
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            return Constraints.initialize(board).equals(Constraints.initialize(board))
        }))
    })

    it('can compare different constraints', () => {
        const board1 = Board.parse("003020600900305001001806400008102900700000008006708200002609500800203009005010300")
        const board2 = Board.parse("200080300060070084030500209000105408000000000402706000301007040720040060004010003")
        expect(board1).toStrictEqualRight(expect.toSatisfy((board1: Board) => {
            expect(board2).toStrictEqualRight(expect.toSatisfy((board2: Board) => {
                return !Constraints.initialize(board1).equals(Constraints.initialize(board2))
            }))
            return true
        }))
    })

    it('can list candidates to continue search', () => {
        const board = Board.parse("003020600900305001001806400008102900700000008006708200002609500800203009005010300")
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            return !Constraints.initialize(board).candidates()[1].isEmpty()
        }))
    })
})
