import React, {FunctionComponent, useContext, useState} from "react";
import './Cell.css'
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

    function isSelected() {
        return context.selected === [row, column]
    }

    return (
        <li onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={classNames({isSelected, hovered})}>
            <span>{context.board[row][column]}</span>
        </li>
    )
}
