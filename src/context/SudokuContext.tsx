import React, {FunctionComponent} from "react";
import {Board} from "../domain/Board";

export const initialState: SudokuContextProps = {
    board: Board.empty(),
    setBoard: () => {},
    selected: [-1, -1],
    setSelected: () => {}
}

interface SudokuContextProps {
    board: Board,
    setBoard: (board: Board) => void
    selected: [number, number]
    setSelected: (coordinate: [number, number]) => void
}

export const SudokuContext = React.createContext<SudokuContextProps>(initialState)

type Props = {
    children: React.ReactNode;
};

export const SudokuProvider: FunctionComponent<Props> = ({children}: Props) => {

    const [board, setBoard] = React.useState(Board.empty())
    const [selected, setSelected] = React.useState<[number, number]>([-1, -1])

    return <SudokuContext.Provider value={{board, setBoard, selected, setSelected}}>
        {children}
    </SudokuContext.Provider>
}
