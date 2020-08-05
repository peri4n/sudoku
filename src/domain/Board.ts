import {Either, left, right} from "fp-ts/lib/Either";
import {isSome, isNone, none, Option, some} from "fp-ts/lib/Option";
import {BoardConstraint, ColumnConstraint, RowConstraint, SquareConstraint} from "./errors/BoardConstraint";
import {Cell} from "./Cell";

type Grid = Cell[][]

export class Board {

    private static readonly DIM = 9

    private readonly grid: Grid;

    constructor(grid: Grid) {
        this.grid = grid
    }

    private static emptyGrid: number[][] = [[], [], [], [], [], [], [], [], []]

    at(row: number, col: number): Cell {
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
        copy[row][col] = Cell.withVal(n)

        return right(new Board(copy))
    }

    private checkRow(row: number, n: number): Option<number> {
        for (let i = 0; i < Board.DIM; i++) {
            if (this.at(row, i).hasVal(n)) {
                return some(i)
            }
        }
        return none
    }

    private checkColumn(col: number, n: number) {
        for (let i = 0; i < Board.DIM; i++) {
            if (this.at(i, col).hasVal(n)) {
                return some(i)
            }
        }
        return none
    }

    private checkSquare(row: number, col: number, n: number): Option<[number, number]> {
        const squareCenterRow = Math.trunc(row / 3) * 3 + 1
        const squareCenterColumn = Math.trunc(col / 3) * 3 + 1
        for (const dRow of [-1, 0, 1]) {
            for (const dCol of [-1, 0, 1]) {
                const checkRow = squareCenterRow + dRow
                const checkCol = squareCenterColumn + dCol

                if (this.at(checkRow, checkCol).hasVal(n)) {
                    return some([checkRow, checkCol])
                }
            }
        }
        return none
    }

    static empty(): Board {
        return Board.prefilled(Board.emptyGrid)
    }

    isFinished(): boolean {
        for (let i = 0; i < Board.DIM; i++) {
            for (let j = 0; j < Board.DIM; j++) {
                if (isNone(this.at(i, j).val())) {
                    return false
                }
            }
        }
        return true;
    }

    static prefilled(numbers: number[][]) {
        const cells: Grid = [[], [], [], [], [], [], [], [], []]
        for (let i = 0; i < Board.DIM; i++) {
            for (let j = 0; j < Board.DIM; j++) {
                if (numbers[i][j] !== undefined) {
                    cells[i][j] = Cell.prefilled(numbers[i][j])
                } else {
                    cells[i][j] = Cell.empty()
                }
            }
        }
        return new Board(cells);
    }
}
