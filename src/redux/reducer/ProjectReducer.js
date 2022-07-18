import { CREATE_PROJECT, GET_ALL_PRIORITY, GET_ALL_PROJECT, GET_ALL_STATUS, GET_ALL_TASK_TYPES } from "../types/ProjectType"

const stateDefault = {
    projectCreated: {},
    arrProject: [],
    arrStatus: [],
    arrPriority: [],
    arrTaskTypes: []
}
const ProjectReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case CREATE_PROJECT: {
            state.projectCreated = action.payload
            return { ...state }
        }
        case GET_ALL_PROJECT: {
            state.arrProject = action.payload
            return { ...state }
        }
        case GET_ALL_STATUS: {
            state.arrStatus = action.payload
            return { ...state }
        }
        case GET_ALL_PRIORITY: {
            state.arrPriority = action.payload
            return { ...state }
        }
        case GET_ALL_TASK_TYPES: {
            state.arrTaskTypes = action.payload
            return { ...state }
        }
        default: return { ...state }
    }
}
export default ProjectReducer