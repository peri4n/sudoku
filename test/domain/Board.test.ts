import {Board} from '../../src/domain/Board'
import 'jest-extended';
import {chain} from "fp-ts/lib/Either";
import '@relmify/jest-fp-ts';
import {ColumnConstraint, RowConstraint, SquareConstraint} from "../../src/domain/errors/BoardConstraint";
import {pipe} from "fp-ts/lib/pipeable";

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
        expect(test).toStrictEqualLeft(new RowConstraint(1, 1))
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
        expect(test).toStrictEqualLeft(new ColumnConstraint(1, 1))
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
        expect(test).toStrictEqualLeft(new SquareConstraint(1, 1))
    })
})
