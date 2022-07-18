import React from 'react'
import Message from '../../component/message/Message'
import { GET_USER_LOGIN, MESSAGE_ERROR_SIGN_IN } from "../types/UserTypes"

const stateDefault = {
    userLogin: ''
}
const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_USER_LOGIN: {
            state.userLogin = action.payload
            localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken))
            localStorage.setItem('userLogin', JSON.stringify(action.payload))
            return { ...state }
        }
        default: return { ...state }
    }
}
export default UserReducer