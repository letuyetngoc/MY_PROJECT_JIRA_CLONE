import BaseService from "./BaseService";

class ProjectService extends BaseService {
    createProject = (data) => {
        return this.post('api/Project/createProject', data)
    }
}
export const projectService = new ProjectService()