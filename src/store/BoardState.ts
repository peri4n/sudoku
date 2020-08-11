import {Board} from "../domain/Board";
import {Position} from "../domain/Position";
import {isRight} from "fp-ts/lib/Either";
import {List} from "immutable";

export interface BoardState {
    boards: List<Board>
    step: number
    selected: Position
}

const ASSIGN_CELL = 'ASSIGN_CELL'
const SELECT_CELL = 'SELECT_CELL'
const UNDO = 'UNDO'
const REDO = 'REDO'

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

interface UndoAction {
    type: typeof UNDO
}

export function undo(): UndoAction {
    return {
        type: UNDO
    }
}

interface RedoAction {
    type: typeof REDO
}

export function redo(): RedoAction {
    return {
        type: REDO
    }
}

type BoardAction = AssignCellAction | SelectCellAction | UndoAction | RedoAction

const initialState: BoardState = {
    boards: List.of(Board.empty()),
    step: 0,
    selected: Position.of(0, 0)
}

export function boardReducer(state: BoardState = initialState, action: BoardAction): BoardState {
    switch (action.type) {
        case ASSIGN_CELL:
            const step = state.boards
                .get(state.step, Board.empty())
                .assign(state.selected.row, state.selected.column, action.payload.value)
            if (isRight(step)) {
                return {
                    ...state,
                    boards: state.boards.push(step.right),
                    step: state.step + 1
                }
            } else {
                return state
            }
        case SELECT_CELL:
            return {
                ...state,
                selected: action.payload.position
            }
        case REDO:
            return {
                ...state,
                step: state.step + 1
            }
        case UNDO:
            return {
                ...state,
                step: state.step - 1
            }
        default:
            return state
    }
}
