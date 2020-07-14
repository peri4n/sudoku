export class Cell {

    private readonly value: number

    private readonly mutable: boolean

    constructor(value: number, mutable: boolean = false) {
        this.value = value
        this.mutable = mutable
    }

    isMutable(): boolean {
        return this.mutable
    }

    val(): number {
        return this.value;
    }
}
