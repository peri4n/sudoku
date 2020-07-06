import {Board} from '../../src/domain/Board'

describe('Board', () => {

    it('empty board', () => {
        expect(Board.empty().isFinished()).toBe(false)
    })
})
