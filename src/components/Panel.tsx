import React, {FunctionComponent} from "react";
import {useDispatch} from "react-redux";
import {redo, undo} from "../store/BoardState";

export const Panel: FunctionComponent = () => {

    const dispatch = useDispatch()

    function handleUndoClick() {
        dispatch(undo())
    }

    function handleRedoClick() {
        dispatch(redo())
    }

    return (
        <div>
            <button onClick={handleUndoClick}>Undo</button>
            <button onClick={handleRedoClick}>Redo</button>
        </div>
    )
}
