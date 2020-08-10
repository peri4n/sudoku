import {Position} from "../Position";

export type BoardConstraint = RowConstraint | ColumnConstraint | SquareConstraint | PrefilledConstraint

export class RowConstraint {
    private conflict: Position;

    constructor(conflict: Position) {
        this.conflict = conflict;
    }

    static at(row: number, column: number) {
        return new RowConstraint(Position.of(row, column))
    }
}

export class ColumnConstraint {
    private conflict: Position;

    constructor(conflict: Position) {
        this.conflict = conflict;
    }

    static at(row: number, column: number) {
        return new ColumnConstraint(Position.of(row, column))
    }
}

export class SquareConstraint {
    private conflict: Position;

    constructor(conflict: Position) {
        this.conflict = conflict;
    }

    static at(conflict: Position) {
        return new SquareConstraint(conflict)
    }
}

export class PrefilledConstraint {
}
