import { combineReducers } from "redux";

import loadingReducer from "./reducer/loadingReducer";
import messageReducer from "./reducer/messageReducer";
import playerReducer from "./reducer/playerReducer";
import tableReducer from "./reducer/tableReducer";
import userReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
  playerReducer,
  tableReducer,
  userReducer,
  messageReducer,
  loadingReducer,
});

export default rootReducer;
