import {chain, Either, left, right} from "fp-ts/lib/Either";
import {isSome, isNone, none, Option, some} from "fp-ts/lib/Option";
import {BoardConstraint, ColumnConstraint, RowConstraint, SquareConstraint} from "./errors/BoardConstraint";
import {Square} from "./Square";
import {Position} from "./Position";
import {Map} from "immutable";
import {pipe} from "fp-ts/lib/pipeable";

type Grid = Map<Position, Square>;

export class Board {

    private static readonly DIM = 9

    private readonly grid: Grid

    constructor(grid: Grid) {
        this.grid = grid
    }

    at(row: number, col: number): Square {
        return this.grid.get(Position.of(row, col)) || Square.empty
    }

    assign(row: number, col: number, n: number): Either<BoardConstraint, Board> {
        // check row constraint
        const checkRow = this.checkRow(row, n);
        if (isSome(checkRow)) {
            return left(RowConstraint.at(row, checkRow.value))
        }

        // check column constraint
        const checkColumn = this.checkColumn(col, n);
        if (isSome(checkColumn)) {
            return left(ColumnConstraint.at(col, checkColumn.value))
        }

        // check square constraint
        const checkSquare = this.checkSquare(row, col, n);
        if (isSome(checkSquare)) {
            return left(SquareConstraint.at(checkSquare.value))
        }

        return right(new Board(
            this.grid.set(
                Position.of(row, col),
                Square.withVal(n))))
    }

    private checkRow(row: number, n: number): Option<number> {
        for (let column = 0; column < Board.DIM; column++) {
            if (this.at(row, column).hasVal(n)) {
                return some(column)
            }
        }
        return none
    }

    private checkColumn(col: number, n: number) {
        for (let row = 0; row < Board.DIM; row++) {
            if (this.at(row, col).hasVal(n)) {
                return some(row)
            }
        }
        return none
    }

    private checkSquare(row: number, col: number, n: number): Option<Position> {
        const squareCenterRow = Math.trunc(row / 3) * 3 + 1
        const squareCenterColumn = Math.trunc(col / 3) * 3 + 1
        for (const dRow of [-1, 0, 1]) {
            for (const dCol of [-1, 0, 1]) {
                const checkRow = squareCenterRow + dRow
                const checkCol = squareCenterColumn + dCol

                if (this.at(checkRow, checkCol).hasVal(n)) {
                    return some(Position.of(checkRow, checkCol))
                }
            }
        }
        return none
    }

    static empty(): Board {
        return new Board(Map())
    }

    /**
     * Parses Sudoku board notation
     * @param str board representation
     */
    static parse(str: String): Either<BoardConstraint, Board> {
        let result: Either<BoardConstraint, Board> = right(this.empty())
        let i = 0
        for (let row = 0; row < Board.DIM; row++) {
            for (let column = 0; column < Board.DIM; column++) {
                const squareValue = Number.parseFloat(str.charAt(i));
                if (!Number.isNaN(squareValue) && (1 <= squareValue) && (squareValue <= 9)) {
                    result = pipe(
                        result,
                        chain((board: Board) => board.assign(row, column, squareValue)))
                }
                i++;
            }
        }
        return result
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
}
