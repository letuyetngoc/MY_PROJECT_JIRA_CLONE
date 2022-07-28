import { APPEAR_LOADING, APPEAR_SMALL_LOADING, HIDE_LOADING, HIDE_SMALL_LOADING } from "../types/LoadingTypes"

const stateDefault = {
    isLoading: false,
    isSmallLoading: false,
}
const LoadingReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case APPEAR_LOADING: {
            state.isLoading = true
            return { ...state }
        }
        case HIDE_LOADING: {
            state.isLoading = false
            return { ...state }
        }
        case APPEAR_SMALL_LOADING: {
            state.isSmallLoading = true
            return { ...state }
        }
        case HIDE_SMALL_LOADING: {
            state.isSmallLoading = false
            return { ...state }
        }
        default: return { ...state }
    }
}
export default LoadingReducer