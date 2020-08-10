import {createStore} from "redux"
import {boardReducer} from "./BoardState";

const rootReducer = boardReducer

export default createStore(rootReducer)

