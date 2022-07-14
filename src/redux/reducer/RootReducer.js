import { combineReducers } from "redux";
import LoadingReducer from "./LoadingReducer";
import MessageReducer from "./MessageReducer";
import PopupModalReducer from "./PopupModalReducer";
import ProjectCategoryReducer from "./ProjectCategoryReducer";
import ProjectReducer from "./ProjectReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
    UserReducer,
    MessageReducer,
    LoadingReducer,
    ProjectCategoryReducer,
    ProjectReducer,
    PopupModalReducer,
})
export default rootReducer