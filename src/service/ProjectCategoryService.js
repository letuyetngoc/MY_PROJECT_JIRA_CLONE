import BaseService from "./BaseService";

class ProjectCategoryService extends BaseService {
    constructor() {
        super()
    }
    projectCategory = () => {
        return this.get('api/ProjectCategory')
    }
}
export const projectCategoryService = new ProjectCategoryService()