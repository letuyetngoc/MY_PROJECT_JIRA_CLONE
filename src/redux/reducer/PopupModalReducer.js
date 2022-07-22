import React from "react"
import TaskDetail from "../../page/TaskDetail/TaskDetail"
import { APPEAR_MODAL, HIDE_MODAL } from "../types/PopupModalTypes"
const stateDefault = {
    Component: <p>Nội dung mặc định</p>,
    isModal: false,
}
const PopupModalReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case APPEAR_MODAL: {
            state.isModal = true
            state.Component = action.payload
            return { ...state }
        }
        case HIDE_MODAL: {
            state.isModal = false
            return { ...state }
        }
        default: return { ...state }
    }
}
export default PopupModalReducer