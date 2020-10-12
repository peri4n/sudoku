import {chain, Either, left, right} from "fp-ts/lib/Either";
import {isSome, isNone, none, Option, some, fromNullable} from "fp-ts/lib/Option";
import {BoardConstraint, ColumnConstraint, RowConstraint, SquareConstraint} from "./errors/BoardConstraint";
import {Digit, Square} from "./Square";
import {Position} from "./Position";
import {Map} from "immutable";
import {pipe} from "fp-ts/lib/pipeable";

type Grid = Map<Position, Square>;

export class Board {

    public static readonly DIM = 9

    private readonly grid: Grid

    constructor(grid: Grid) {
        this.grid = grid
    }

    atPos(position: Position): Option<Square> {
        return fromNullable(this.grid.get(position))
    }

    at(row: number, column: number): Option<Square> {
        return fromNullable(this.grid.get(Position.of(row, column)))
    }

    assign(row: number, col: number, n: Digit): Either<BoardConstraint, Board> {
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

    forEach(sideEffect: (p: Position, s: Square) => any): void {
        this.grid.forEach((value, key) => sideEffect(key, value))
    }

    hasDigitAt(position: Position, value: Digit): boolean {
        const maybeSquare = this.atPos(position);
        return isSome(maybeSquare) && maybeSquare.value.hasVal(value);
    }

    private checkRow(row: number, n: Digit): Option<number> {
        for (let col = 0; col < Board.DIM; col++) {
            if (this.hasDigitAt(Position.of(row, col), n)) {
                return some(col)
            }
        }
        return none
    }

    private checkColumn(col: number, n: Digit) {
        for (let row = 0; row < Board.DIM; row++) {
            if (this.hasDigitAt(Position.of(row, col), n)) {
                return some(row)
            }
        }
        return none
    }

    private checkSquare(row: number, col: number, n: Digit): Option<Position> {
        const squareCenterRow = Math.trunc(row / 3) * 3 + 1
        const squareCenterColumn = Math.trunc(col / 3) * 3 + 1
        for (const dRow of [-1, 0, 1]) {
            for (const dCol of [-1, 0, 1]) {
                const checkRow = squareCenterRow + dRow
                const checkCol = squareCenterColumn + dCol

                if (this.hasDigitAt(Position.of(checkRow, checkCol), n)) {
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
        Position.all.forEach(pos => {
            const squareValue = Number.parseFloat(str.charAt(i)) as Digit
            if (!Number.isNaN(squareValue) && (1 <= squareValue) && (squareValue <= 9)) {
                result = pipe(
                    result,
                    chain((board: Board) => board.assign(pos.row, pos.column, squareValue)))
            }
            i++;
        })
        return result
    }

    toString(): String {
        let res = "";
        Position.all.forEach(pos => {
            const square = this.atPos(pos);
            if (isSome(square)) {
                res += square.value.value
            } else {
                res += "."
            }
        })
        return res.match(/.{9}/g)!.join('\n')
    }

    isFinished(): boolean {
        return Position.all
            .filter(pos => isNone(this.atPos(pos)))
            .isEmpty();
    }
}
