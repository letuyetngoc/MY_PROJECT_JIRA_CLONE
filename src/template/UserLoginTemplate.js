import React from 'react'
import { Route } from 'react-router-dom'

export default function UserLoginTemplate(props) {
    const { Component, ...restProps } = props
    return (
        <Route {...restProps} render={(propsRout) => {
            return <div className='userLoginTemplate'>
                <div className='userLoginTemplate__left'>
                    <Component {...propsRout} />
                </div>
                <div className='userLoginTemplate__right'>
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="w-full"
                        alt="Sample image"
                    />
                </div>
            </div>
        }} />
    )
}
