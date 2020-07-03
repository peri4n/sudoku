import React, {FunctionComponent, useContext, useEffect} from "react";
import {Board} from "./Board";
import {Panel} from "./Panel";
import {SudokuContext} from "../context/SudokuContext";

const mutate = (grid: number[][], row: number, column: number, value: number): number[][] => {
    const copy = grid.map(c => c.slice())
    copy[row][column] = value
    return copy
}

export const Sudoku: FunctionComponent = () => {

    const context = useContext(SudokuContext)

    const handleKeyPress = (e: KeyboardEvent) => {
        const digit = Number.parseInt(e.key);
        if (!Number.isNaN(digit)) {
            const [row, column] = context.selected
            context.setBoard(mutate(context.board, row, column, digit))
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
