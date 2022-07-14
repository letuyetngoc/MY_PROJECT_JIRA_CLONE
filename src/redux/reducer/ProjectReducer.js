import { CREATE_PROJECT } from "../types/ProjectType"

const stateDefault = {
    projectCreated: {}
}
const ProjectReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case CREATE_PROJECT: {
            state.projectCreated = action.payload
            return { ...state }
        }
        default: return { ...state }
    }
}
export default ProjectReducer