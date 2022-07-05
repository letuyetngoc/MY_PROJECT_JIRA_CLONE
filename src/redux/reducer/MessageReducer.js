import React from 'react'
import { MESSAGE_APPEAR, MESSAGE_DISAPPEAR } from "../types/UserTypes"

const stateDefault = {
    isMessage: false,
    Component: <p>Hiển thị mặc định</p>
}
const MessageReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case MESSAGE_APPEAR: {
            state.isMessage = true
            state.Component = action.payload
            return { ...state }
        }
        case MESSAGE_DISAPPEAR: {
            state.isMessage = false
            return { ...state }
        }
        default: return { ...state }
    }
}
export default MessageReducer