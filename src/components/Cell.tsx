import React, {FunctionComponent, useState} from "react";
import styles from "./Cell.module.css"
import {useDispatch} from "react-redux";
import {selectCell} from "../store/BoardState";
import {Position} from "../domain/Position";

const classNames = require('classnames/bind')
const cx = classNames.bind(styles);

interface CellProps {
    position: Position
    value: string
    isSelected: boolean
}

export const Cell: FunctionComponent<CellProps> = React.memo(({position, value, isSelected}) => {

    const dispatch = useDispatch()
    const [hovered, setHovered] = useState(false)

    function handleClick() {
        dispatch(selectCell(position))
    }

    function handleMouseEnter() {
        setHovered(true)
    }

    function handleMouseLeave() {
        setHovered(false)
    }

    const className = cx({
        cell: true,
        hovered,
        selected: isSelected
    })

    return (
        <li onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={className}>
            <span>{value}</span>
        </li>
    )
})
