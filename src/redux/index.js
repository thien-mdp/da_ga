import { combineReducers } from "redux";

import playerReducer from "./reducer/playerReducer";

const rootReducer = combineReducers({
    playerReducer
});

export default rootReducer;