import { combineReducers } from "redux";
import MessageReducer from "./MessageReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
    UserReducer,
    MessageReducer,
})
export default rootReducer