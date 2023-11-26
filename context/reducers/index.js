import { combineReducers } from "redux";
import reducer from "./reducers";
const rootReducer = combineReducers({
    todos: reducer,
});

export default rootReducer;