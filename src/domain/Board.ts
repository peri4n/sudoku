import {Either, left, right} from "fp-ts/lib/Either";
import {isSome, none, Option, some} from "fp-ts/lib/Option";
import {BoardConstraint, ColumnConstraint, RowConstraint, SquareConstraint} from "./errors/BoardConstraint";

type Grid = number[][]

export class Board {

    private static readonly DIM = 9

    private readonly grid: Grid;

    constructor(grid: Grid) {
        this.grid = grid
    }

    private static emptyGrid: Grid = [[], [], [], [], [], [], [], [], []]

    at(row: number, col: number): number {
        return this.grid[row][col]
    }

    assign(row: number, col: number, n: number): Either<BoardConstraint, Board> {
        // check row constraint
        const checkRow = this.checkRow(row, n);
        if (isSome(checkRow)) {
            return left(new RowConstraint(row, checkRow.value))
        }

        // check column constraint
        const checkColumn = this.checkColumn(col, n);
        if (isSome(checkColumn)) {
            return left(new ColumnConstraint(col, checkColumn.value))
        }

        // check square constraint
        const checkSquare = this.checkSquare(row, col, n);
        if (isSome(checkSquare)) {
            return left(new SquareConstraint(checkSquare.value[0], checkSquare.value[1]))
        }

        const copy = this.grid.map(c => c.slice())
        copy[row][col] = n
        return right(new Board(copy))
    }

    private checkRow(row: number, n: number): Option<number> {
        for (let i = 0; i < Board.DIM; i++) {
            if (this.at(row, i) === n) {
                return some(i)
            }
        }
        return none
    }

    private checkColumn(col: number, n: number) {
        for (let i = 0; i < Board.DIM; i++) {
            if (this.at(i, col) === n) {
                return some(i)
            }
        }
        return none
    }

    private checkSquare(row: number, col: number, n: number): Option<[number, number]> {
        for (const dRow of [-1, 0, 1]) {
            for (const dColumn of [-1, 0, 1]) {
                if (dRow === 0 && dColumn === 0) {
                    continue
                }

                if (this.at(row + dRow, col + dColumn) === n) {
                    return some([row + dRow, col + dColumn])
                }
            }
        }
        return none
    }

    static empty(): Board {
        return new Board(Board.emptyGrid)
    }

    isFinished(): boolean {
        for (let i = 0; i < Board.DIM; i++) {
            for (let j = 0; j < Board.DIM; j++) {
                if (this.at(i, j) === undefined) {
                    return false
                }
            }
        }
        return true;
    }
}
