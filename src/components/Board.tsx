import React, {FunctionComponent} from "react";
import {Cell} from "./Cell";
import './Board.css'

const range = (n: number) => Array.from({length: n}, (value, key) => key)

export const Board: FunctionComponent = () => {

    return (
        <ul>
            {range(9).map(row =>
                range(9).map(column => <Cell key={row + "" + column} row={row} column={column}/>)
            )}
        </ul>)

}
