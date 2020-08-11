import React, {FunctionComponent} from "react"
import {Cell} from "./Cell"
import styles from "./Board.module.css"
import {useSelector} from "react-redux";
import {BoardState} from "../store/BoardState";
import {Position} from "../domain/Position";

const range = (n: number) => Array.from({length: n}, (value, key) => key)

export const Board: FunctionComponent = () => {

    const board = useSelector((state: BoardState) => state.board)

    const selected = useSelector((state: BoardState) => state.selected)

    return (
        <ul className={styles.board}>
            {range(9).map(row =>
                range(9).map(column => {
                    const position = Position.of(row, column)
                    const value = board.at(row, column).str()
                    const isSelected = selected.equals(position)
                    return <Cell key={row + "" + column} position={position} value={value} isSelected={isSelected}/>
                })
            )}
        </ul>)

}
