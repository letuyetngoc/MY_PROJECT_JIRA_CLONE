import { GET_ALL_COMMENTS } from "../types/CommentTypeReducer"

const stateDefault = {
    arrAllComment: []
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