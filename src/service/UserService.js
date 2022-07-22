import BaseService from './BaseService'

class UserService extends BaseService {
    signin = (data) => {
        return this.post('api/Users/signin', data)
    }
    signup = (data) => {
        return this.post('api/Users/signup', data)
    }
    getUser = (searchValue) => {
        return this.get(`api/Users/getUser?keyword=${searchValue}`)
    }
    deleteUser = (userId) => {
        return this.delete(`api/Users/deleteUser?id=${userId}`)
    }
}
export const userService = new UserService()