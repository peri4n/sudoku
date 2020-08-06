import React, {FunctionComponent, useContext, useState} from "react";
import styles from "./Cell.module.css"
import {SudokuContext} from "../context/SudokuContext";

const classNames = require('classnames/bind')
const cx = classNames.bind(styles);

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

    function isSelected() {
        return context.selected[0] === row && context.selected[1] === column
    }

    const className = cx({
        cell: true,
        hovered,
        selected: isSelected()
    })

    return (
        <li onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={className}>
            <span>{context.board.at(row, column).str()}</span>
        </li>
    )
}
