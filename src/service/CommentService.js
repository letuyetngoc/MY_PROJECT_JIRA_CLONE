import BaseService from "./BaseService";

class CommentService extends BaseService {
    constructor() {
        super()
    }
    insertComment = (data) => {
        return this.post('api/Comment/insertComment', data)
    }
    getAllComment = (taskId) => {
        return this.get(`api/Comment/getAll?taskId=${taskId}`)
    }
    deleteComment = (commentId) => {
        return this.delete(`api/Comment/deleteComment?idComment=${commentId}`)
    }
    updateComment = (commentId, contentComment) => {
        return this.put(`api/Comment/updateComment?id=${commentId}&contentComment=${contentComment}`)
    }
}
export const commentService = new CommentService()