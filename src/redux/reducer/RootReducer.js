import { combineReducers } from "redux";
import LoadingReducer from "./LoadingReducer";
import MessageReducer from "./MessageReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
    UserReducer,
    MessageReducer,
    LoadingReducer,
})
export default rootReducer