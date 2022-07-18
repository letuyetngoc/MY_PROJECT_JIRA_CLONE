import BaseService from "./BaseService";

class ProjectService extends BaseService {
    createProject = (data) => {
        return this.post('api/Project/createProjectAuthorize', data)
    }
    getAllProject = () => {
        return this.get('api/Project/getAllProject')
    }
    getAllStatus = () => {
        return this.get('api/Status/getAll')
    }
    getAllPriority = () => {
        return this.get('api/Priority/getAll')
    }
    getAllTaskTypes = () => {
        return this.get('api/TaskType/getAll')
    }
    createTask = (data) => {
        return this.post('api/Project/createTask', data)
    }
}
export const projectService = new ProjectService()