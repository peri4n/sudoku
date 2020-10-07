import {Board} from "../../src/domain/Board";
import {Constraints} from "../../src/domain/Constraints";
import '@relmify/jest-fp-ts';

describe('Constraints', function () {

    it('can be initialized', () => {
        const board = Board.parse("003020600900305001001806400008102900700000008006708200002609500800203009005010300")
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
            const constraints = Constraints.initialize(board);
            return true
        }))
    })

});
