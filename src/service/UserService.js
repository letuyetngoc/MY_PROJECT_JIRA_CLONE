import React, { Component } from 'react'
import BaseService from './BaseService'

class UserService extends BaseService {
    constructor() {
        super()
    }
    signin = (data) => {
        return this.post('api/Users/signin', data)
    }
    signup = (data) => {
        return this.post('api/Users/signup', data)
    }
}
export const userService = new UserService()