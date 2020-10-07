import {Board} from '../../src/domain/Board'
import 'jest-extended';
import {chain} from "fp-ts/lib/Either";
import '@relmify/jest-fp-ts';
import {ColumnConstraint, RowConstraint, SquareConstraint} from "../../src/domain/errors/BoardConstraint";
import {pipe} from "fp-ts/lib/pipeable";
import {Position} from "../../src/domain/Position";

describe('Board', () => {

    it('empty board', () => {
        expect(Board.empty().isFinished()).toBe(false)
    })

    it('can assign a number in a row', () => {
        const test = pipe(
            Board.empty().assign(1, 1, 2),
            chain((board: Board) => board.assign(1, 2, 3))
        )
        expect(test).toStrictEqualRight(expect.toSatisfy((board: Board) =>
            board.at(1, 1).hasVal(2) && board.at(1, 2).hasVal(3))
        )
    })

    it('can not assign the same number in a row', () => {
        const test = pipe(
            Board.empty().assign(1, 1, 2),
            chain((board: Board) => board.assign(1, 2, 2))
        )
        expect(test).toStrictEqualLeft(new RowConstraint(Position.of(1, 1)))
    })

    it('can assign a number in a column', () => {
        const test = pipe(
            Board.empty().assign(1, 1, 2),
            chain((board: Board) => board.assign(2, 1, 3))
        )
        expect(test).toStrictEqualRight(expect.toSatisfy((board: Board) =>
            board.at(1, 1).hasVal(2) && board.at(2, 1).hasVal(3))
        )
    })

    it('can not assign the same number in a column', () => {
        const test = pipe(
            Board.empty().assign(1, 1, 2),
            chain((board: Board) => board.assign(2, 1, 2))
        )
        expect(test).toStrictEqualLeft(new ColumnConstraint(Position.of(1, 1)))
    })

    it('can assign a number in a square', () => {
        const test = pipe(
            Board.empty().assign(1, 1, 2),
            chain((board: Board) => board.assign(2, 2, 3))
        )
        expect(test).toStrictEqualRight(expect.toSatisfy((board: Board) =>
            board.at(1, 1).hasVal(2) && board.at(2, 2).hasVal(3))
        )
    })

    it('can not assign the same number in a square', () => {
        const test = pipe(
            Board.empty().assign(1, 1, 2),
            chain((board: Board) => board.assign(2, 2, 2))
        )
        expect(test).toStrictEqualLeft(new SquareConstraint(Position.of(1, 1)))
    })

    it('can be parsed from a string', () => {
        const board = Board.parse("003020600900305001001806400008102900700000008006708200002609500800203009005010300")
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) =>
            // just some random checks
            board.at(0, 2).hasVal(3) && board.at(0, 4).hasVal(2))
        )
    })

    it('can be printed', () => {
        const board = Board.parse("003020600900305001001806400008102900700000008006708200002609500800203009005010300")
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            console.log(board.toString())
            return true
        }))
    })
})
