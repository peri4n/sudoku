import {Board} from "../../src/domain/Board";
import {Solver} from "../../src/domain/Solver";
import {BasicRule} from "../../src/domain/Rule";
import {List} from "immutable";
import '@relmify/jest-fp-ts';

describe("The Sudoku solver", () => {

    it('can solve easy problems', () => {
        const board = Board.parse("003020600900305001001806400008102900700000008006708200002609500800203009005010300")
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) =>
            Solver.solve(board, List.of(new BasicRule)).isFinished()
        ))
    })
})
