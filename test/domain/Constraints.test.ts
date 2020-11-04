import {Board} from "../../src/domain/Board";
import {Constraints} from "../../src/domain/Constraints";
import '@relmify/jest-fp-ts';
import {Column, Position, Row} from "../../src/domain/Position";
import {BasicRule} from "../../src/domain/BasicRule";

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
            const constraints = Constraints.initialize(board).assign(Position.of(Row.A, Column.Two), 3);
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
            return Constraints.initialize(board).candidates()[1].isAmbiguous()
        }))
    })

    it('can list possible positions for a digit', () => {
        const board = Board.parse("200080300060070084030500209000105408000000000402706000301007040720040060004010003")
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const initialConstraints = Constraints.initialize(board)
            const evaluate = new BasicRule().evaluate(initialConstraints)
            expect(evaluate).toStrictEqualRight(expect.toSatisfy((constraints: Constraints) => {
                expect(constraints.reverseIndex(Position.of(Row.A, Column.Seven).sameRow()).get(6)).toEqual([Position.of(Row.A, Column.Nine)])
                expect(constraints.reverseIndex(Position.of(Row.A, Column.Seven).sameColumn()).get(6)).toEqual([Position.of(Row.E, Column.Seven)])
                expect(constraints.reverseIndex(Position.of(Row.E, Column.Five).sameSquare()).get(4)).toEqual([Position.of(Row.E, Column.Four), Position.of(Row.E, Column.Six)])
                return true
            }))
            return true
        }))
    })
})
