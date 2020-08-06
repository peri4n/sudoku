import React, {FunctionComponent} from "react"
import {Cell} from "./Cell"
import styles from "./Board.module.css"

const range = (n: number) => Array.from({length: n}, (value, key) => key)

export const Board: FunctionComponent = () => {

    const MCell = React.memo(Cell)

    return (
        <ul className={styles.board}>
            {range(9).map(row =>
                range(9).map(column => <MCell key={row + "" + column} row={row} column={column}/>)
            )}
        </ul>)

}
