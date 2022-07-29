import { GET_ALL_COMMENTS, GET_TIME_SINCE_COMMENT_CREATION, INSERT_COMMENT } from "../types/CommentTypeReducer"

const stateDefault = {
    arrAllComment: [],
    commentInserted: {},
}
const CommentReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_COMMENTS: {
            state.arrAllComment = action.payload
            return { ...state }
        }
        default: return { ...state }
    }
}
export default CommentReducer