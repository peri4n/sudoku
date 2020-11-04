import {Board} from "../../../src/domain/Board";
import {Constraints} from "../../../src/domain/Constraints";
import {BasicRule} from "../../../src/domain/rule/BasicRule";
import '@relmify/jest-fp-ts';

describe('The basic rule', () => {

    const rule = new BasicRule()

    it('can solve a very easy board', () => {
        const board = Board.parse("003020600900305001001806400008102900700000008006708200002609500800203009005010300")
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
                const constraints = Constraints.initialize(board)
                const evaluate = rule.evaluate(constraints)
                expect(evaluate).toStrictEqualRight(expect.toSatisfy((constraints: Constraints) => {
                    return constraints.isFinished()
                }))
                return true
            }
        ))
    })

    it('can not solve slightly harder boards', () => {
        const board = Board.parse('200080300060070084030500209000105408000000000402706000301007040720040060004010003')
        expect(board).toStrictEqualRight(expect.toSatisfy((board: Board) => {
                const constraints = Constraints.initialize(board)
                const evaluate = rule.evaluate(constraints)
                expect(evaluate).toStrictEqualRight(expect.toSatisfy((constraints: Constraints) => {
                    return !constraints.isFinished()
                }))
                return true
            }
        ))
    })
})
