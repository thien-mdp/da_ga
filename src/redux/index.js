import { combineReducers } from "redux";

import playerReducer from "./reducer/playerReducer";
import tableReducer from "./reducer/tableReducer";
import userReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
  playerReducer,
  tableReducer,
  userReducer,
});

export default rootReducer;
