import {Candidates} from "../../src/domain/Candidates";

describe('Candidates', () => {

    it('start unconstrained', () => {
        expect(Candidates.initialize().toString()).toBe("[123456789]")
    })

    it('can be further constrained', () => {
        expect(Candidates.initialize().remove(1).toString()).toBe("[23456789]")
        expect(Candidates.initialize().remove(8).toString()).toBe("[12345679]")
    })

    it('can be compared', () => {
        expect(Candidates.initialize()).toEqual(Candidates.initialize())
        expect(Candidates.initialize()).not.toEqual(Candidates.initialize().remove(3))
    })
})
