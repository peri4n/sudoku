import React, {FunctionComponent} from "react";
import {Sudoku} from "./Sudoku";
import {Provider} from "react-redux";
import store from "../store"

export const App: FunctionComponent = () => {

    return (
        <React.StrictMode>
            <Provider store={store}>
                <Sudoku/>
            </Provider>
        </React.StrictMode>
    )
}
