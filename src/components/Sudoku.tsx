import React, {FunctionComponent, useContext, useEffect} from "react";
import {Board} from "./Board";
import {Panel} from "./Panel";
import {useDispatch} from "react-redux";
import {assignCell} from "../store/BoardState";

export const Sudoku: FunctionComponent = () => {

    const dispatch = useDispatch()

    const handleKeyPress = (e: KeyboardEvent) => {
        const digit = Number.parseInt(e.key);
        if (!Number.isNaN(digit)) {
            dispatch(assignCell(digit))
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
