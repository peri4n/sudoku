import React, {FunctionComponent} from "react";
import {SudokuProvider} from "../context/SudokuContext";
import {Sudoku} from "./Sudoku";

export const App: FunctionComponent = () => {

    return (
        <React.StrictMode>
            <SudokuProvider>
                <Sudoku/>
            </SudokuProvider>
        </React.StrictMode>
    )
}
