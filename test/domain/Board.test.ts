import {Board} from '../../src/domain/Board'
import {isLeft} from "fp-ts/lib/Either";
import {ColumnConstraint, RowConstraint, SquareConstraint} from "../../src/domain/errors/BoardConstraint";

describe('Board', () => {

    it('empty board', () => {
        expect(Board.empty().isFinished()).toBe(false)
    })

    it('can not assign the same number in a row', () => {
        const board = Board.empty()
        const step1 = board.assign(1, 1, 2)
        if (isLeft(step1)) {
            fail("should not happen")
        } else {
            const board1 = step1.right;
            const step2 = board1.assign(1, 2, 2)
            if (isLeft(step2)) {
                expect(step2.left).toEqual(new RowConstraint(1, 1))
            } else {
                fail("It is not allowed to have a number twice within a row")
            }
        }
    })

    it('can not assign the same number in a column', () => {
        const board = Board.empty()
        const step1 = board.assign(1, 1, 2)
        if (isLeft(step1)) {
            fail("should not happen")
        } else {
            const board1 = step1.right;
            const step2 = board1.assign(2, 1, 2)
            if (isLeft(step2)) {
                expect(step2.left).toEqual(new ColumnConstraint(1, 1))
            } else {
                fail("It is not allowed to have a number twice within a column")
            }
        }
    })

    it('can not assign the same number in a square', () => {
        const board = Board.empty()
        const step1 = board.assign(1, 1, 2)
        if (isLeft(step1)) {
            fail("should not happen")
        } else {
            const board1 = step1.right;
            const step2 = board1.assign(2, 2, 2)
            if (isLeft(step2)) {
                expect(step2.left).toEqual(new SquareConstraint(1, 1))
            } else {
                fail("It is not allowed to have a number twice within a square")
            }
        }
    })
})
