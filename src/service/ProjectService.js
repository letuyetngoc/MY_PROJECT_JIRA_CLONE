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
    getProjectDetail = (projectId) => {
        return this.get(`api/Project/getProjectDetail?id=${projectId}`)
    }
    updateProject = (projectId, data) => {
        return this.put(`api/Project/updateProject?projectId=${projectId}`, data)
    }
    deleteProject = (projectId) => {
        return this.delete(`api/Project/deleteProject?projectId=${projectId}`)
    }
    assignUserProject = (data) => {
        return this.post('api/Project/assignUserProject', data)
    }
    removeUserFromProject = (data) => {
        return this.post('api/Project/removeUserFromProject', data)
    }
    updateStatus = (data) => {
        return this.put('api/Project/updateStatus', data)
    }
    getTaskDetail = (taskId) => {
        return this.get(`api/Project/getTaskDetail?taskId=${taskId}`)
    }
    assignUserTask = (data) => {
        return this.post('api/Project/assignUserTask', data)
    }
    removeUserFromTask = (data) => {
        return this.post('api/Project/removeUserFromTask', data)
    }
    updateTask = (data) => {
        return this.post('api/Project/updateTask', data)
    }
    removeTask = (taskId) => {
        return this.delete(`api/Project/removeTask?taskId=${taskId}`)
    }
}
export const projectService = new ProjectService()