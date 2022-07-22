import React from 'react'
import { MESSAGE_ALERT_APPEAR, MESSAGE_ALERT_DISAPPEAR, MESSAGE_APPEAR, MESSAGE_DISAPPEAR } from "../types/MessageTypes"

const stateDefault = {
    isMessage: false,
    isAlertMessage: false,
    infoAlertMessage: '',
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
        case MESSAGE_ALERT_APPEAR: {
            state.isAlertMessage = true
            state.infoAlertMessage = action.payload
            return { ...state }
        }
        case MESSAGE_ALERT_DISAPPEAR: {
            state.isAlertMessage = false
            return { ...state }
        }
        default: return { ...state }
    }
}
export default MessageReducer