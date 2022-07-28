import { GET_ALL_USER, GET_USERS_BY_PROJECTID, GET_USER_ID, GET_USER_LOGIN } from "../types/UserTypes"

const stateDefault = {
    userLogin: '',
    arrUser: [],
    deleteUserId: '',
    arrUsersByProjectId: [],
}
const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_USER_LOGIN: {
            state.userLogin = action.payload
            localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken))
            localStorage.setItem('userLogin', JSON.stringify(action.payload))
            return { ...state }
        }
        case GET_ALL_USER: {
            state.arrUser = action.payload
            return { ...state }
        }
        case GET_USER_ID: {
            state.deleteUserId = action.payload
            return { ...state }
        }
        case GET_USERS_BY_PROJECTID: {
            state.arrUsersByProjectId = action.payload
            return { ...state }
        }
        default: return { ...state }
    }
}
export default UserReducer