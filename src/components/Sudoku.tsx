import React, {FunctionComponent, useContext, useEffect} from "react";
import {Board} from "./Board";
import {Panel} from "./Panel";
import {SudokuContext} from "../context/SudokuContext";
import {isRight} from "fp-ts/lib/Either";

export const Sudoku: FunctionComponent = () => {

    const context = useContext(SudokuContext)

    const handleKeyPress = (e: KeyboardEvent) => {
        const digit = Number.parseInt(e.key);
        if (!Number.isNaN(digit)) {
            const [row, column] = context.selected
            const board = context.board.assign(row, column, digit);
            if (isRight(board)) {
                context.setBoard(board.right)
            } else {
                console.log(board.left)
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keypress", handleKeyPress)

        return () => window.removeEventListener("keypress", handleKeyPress)
    })

    return (
        <div>
            <Board/>
            <Panel/>
        </div>
    )
}
