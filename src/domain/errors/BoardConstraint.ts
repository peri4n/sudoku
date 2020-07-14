export type BoardConstraint = RowConstraint | ColumnConstraint | SquareConstraint | PrefilledConstraint

export class RowConstraint {
    private row: number;
    private col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;

    }
}

export class ColumnConstraint {
    private row: number;
    private col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;

    }
}

export class SquareConstraint {
    private row: number;
    private col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;

    }
}

export class PrefilledConstraint {
}
