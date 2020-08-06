import React, {FunctionComponent, useContext, useState} from "react";
import styles from "./Cell.module.css"
import {SudokuContext} from "../context/SudokuContext";

const classNames = require('classnames')

interface CellProps {
    row: number
    column: number
}

export const Cell: FunctionComponent<CellProps> = ({row, column}) => {

    const context = useContext(SudokuContext)

    const [hovered, setHovered] = useState(false)

    function handleClick() {
        context.setSelected([row, column])
    }

    function handleMouseEnter() {
        setHovered(true)
    }

    function handleMouseLeave() {
        setHovered(false)
    }

    const names = hovered ? styles.hovered : ""

    return (
        <li onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={classNames(names, styles.cell)}>
            <span>{context.board.at(row, column).str()}</span>
        </li>
    )
}
