import {Board} from "../../src/domain/Board";
import {Solver} from "../../src/domain/Solver";
import '@relmify/jest-fp-ts';
import {BasicRule} from "../../src/domain/rule/BasicRule";
import {SinglePossibilityRule} from "../../src/domain/rule/SinglePossibilityRule";
import {TwinExclusionRule} from "../../src/domain/rule/TwinExclusionRule";
import {Constraints} from "../../src/domain/Constraints";

describe("The Sudoku solver", () => {

    const rules = [new BasicRule, new SinglePossibilityRule(), new TwinExclusionRule()]

    it('can solve easy problem 1', () => {
        const board = Board.parse('003020600900305001001806400008102900700000008006708200002609500800203009005010300')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, ...rules)
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished() && constraints.isStricterThan(Constraints.initialize(board))
            }))
            return true
        }))
    })

    it('can solve easy problem 2', () => {
        const board = Board.parse('200080300060070084030500209000105408000000000402706000301007040720040060004010003')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, ...rules)
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished() && constraints.isStricterThan(Constraints.initialize(board))
            }))
            return true
        }))
    })

    it('can solve easy problem 3', () => {
        const board = Board.parse('000000907000420180000705026100904000050000040000507009920108000034059000507000000')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, ...rules)
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished() && constraints.isStricterThan(Constraints.initialize(board))
            }))
            return true
        }))
    })

    it('can solve hard problem 1', () => {
        const board = Board.parse('400000805030000000000700000020000060000080400000010000000603070500200000104000000')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, ...rules)
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished() && constraints.isStricterThan(Constraints.initialize(board))
            }))
            return true
        }))
    })

    it('can solve hard problem 2', () => {
        const board = Board.parse('520006000000000701300000000000400800600000050000000000041800000000030020008700000')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, ...rules)
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished() && constraints.isStricterThan(Constraints.initialize(board))
            }))
            return true
        }))
    })

    it('can solve hard problem 3', () => {
        const board = Board.parse('600000803040700000000000000000504070300200000106000000020000050000080600000010000')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, ...rules)
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished() && constraints.isStricterThan(Constraints.initialize(board))
            }))
            return true
        }))
    })

    it('can solve hard problem 4', () => {
        const board = Board.parse('480300000000000071020000000705000060000200800000000000001076000300000400000050000')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, ...rules)
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished() && constraints.isStricterThan(Constraints.initialize(board))
            }))
            return true
        }))
    })

    it('can solve hard problem 5', () => {
        const board = Board.parse('480300000000000071020000000705000060000200800000000000001076000300000400000050000')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const solve = Solver.solve(board, ...rules)
            expect(solve).toStrictEqualRight(expect.toSatisfy(constraints => {
                return constraints.isFinished() && constraints.isStricterThan(Constraints.initialize(board))
            }))
            return true
        }))
    })
})
