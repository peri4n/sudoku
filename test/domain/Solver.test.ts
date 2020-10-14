import {Board} from "../../src/domain/Board";
import {Solver} from "../../src/domain/Solver";
import {BasicRule} from "../../src/domain/Rule";
import {List} from "immutable";
import '@relmify/jest-fp-ts';

describe("The Sudoku solver", () => {

    it('can solve easy problem 1', () => {
        const board = Board.parse('003020600900305001001806400008102900700000008006708200002609500800203009005010300')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, List.of(new BasicRule))
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished()
            }))
            return true
        }))
    })

    it('can solve easy problem 2', () => {
        const board = Board.parse('200080300060070084030500209000105408000000000402706000301007040720040060004010003')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, List.of(new BasicRule))
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished()
            }))
            return true
        }))
    })

    it('can solve easy problem 3', () => {
        const board = Board.parse('000000907000420180000705026100904000050000040000507009920108000034059000507000000')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, List.of(new BasicRule))
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished()
            }))
            return true
        }))
    })

    it('can solve hard problem 1', () => {
        const board = Board.parse('4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, List.of(new BasicRule))
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished()
            }))
            return true
        }))
    })
})
