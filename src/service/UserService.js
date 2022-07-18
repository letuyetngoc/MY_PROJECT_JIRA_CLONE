import React, { Component } from 'react'
import BaseService from './BaseService'

class UserService extends BaseService {
    signin = (data) => {
        return this.post('api/Users/signin', data)
    }
    signup = (data) => {
        return this.post('api/Users/signup', data)
    }
    getUser = () => {
        return this.get('api/Users/getUser')
    }
}
export const userService = new UserService()