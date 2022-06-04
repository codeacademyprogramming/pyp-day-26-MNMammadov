import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { IRoom } from "../models";
import { roomsReducers } from "./rooms/reducer";

export interface IReduxState {
    rooms: IRoom[];
}

const rootReducer = combineReducers({
    rooms: roomsReducers,
});

export const store = createStore(rootReducer, composeWithDevTools());