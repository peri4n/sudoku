import {Board} from "../domain/Board";
import {Position} from "../domain/Position";
import {isRight} from "fp-ts/lib/Either";

export interface BoardState {
    board: Board
    selected: Position
}

const ASSIGN_CELL = 'ASSIGN_CELL'
const SELECT_CELL = 'SELECT_CELL'

interface AssignCell {
    value: number
}

interface SelectCell {
    position: Position
}

interface AssignCellAction {
    type: typeof ASSIGN_CELL
    payload: AssignCell
}

export function assignCell(value: number): AssignCellAction {
    return {
        type: ASSIGN_CELL,
        payload: {
            value: value
        }
    }
}

interface SelectCellAction {
    type: typeof SELECT_CELL
    payload: SelectCell
}

export function selectCell(position: Position): SelectCellAction {
    return {
        type: SELECT_CELL,
        payload: {
            position: position
        }
    }
}

type BoardAction = AssignCellAction | SelectCellAction

const initialState: BoardState = {
    board: Board.empty(),
    selected: Position.of(0, 0)
}

export function boardReducer(state: BoardState = initialState, action: BoardAction): BoardState {
    switch (action.type) {
        case ASSIGN_CELL:
            const step = state.board.assign(state.selected.row, state.selected.column, action.payload.value)
            if (isRight(step)) {
                return {
                    ...state,
                    board: step.right
                }
            } else {
                return state
            }
        case "SELECT_CELL":
            return {
                ...state,
                selected: action.payload.position
            }
        default:
            return state
    }
}
