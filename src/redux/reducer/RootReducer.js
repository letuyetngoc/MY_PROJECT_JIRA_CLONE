import { combineReducers } from "redux";
import LoadingReducer from "./LoadingReducer";
import MessageReducer from "./MessageReducer";
import ProjectCategoryReducer from "./ProjectCategoryReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
    UserReducer,
    MessageReducer,
    LoadingReducer,
    ProjectCategoryReducer,
})
export default rootReducer