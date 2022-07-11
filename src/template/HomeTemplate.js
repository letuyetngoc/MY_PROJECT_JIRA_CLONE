import React, { useMemo } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
// icon react
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import MenuItem from '../component/menu/MenuItem';

export default function HomeTemplate(props) {
    const { Component, ...restProps } = props

    const userLogin = useMemo(() => {
        return JSON.parse(localStorage.getItem('userLogin'))
    }, [])

    return (
        <Route {...restProps} render={(propsRout) => {
            return (
                <div className='hometemplate'>
                    <div className='hometemplate__nav'>
                        <div className='hometemplate__nav-logo'>
                            <a>
                                <AiOutlineHome className='icon' />
                            </a>
                        </div>
                        <div className='hometemplate__nav-icon'>
                            <BiSearch className='icon' />
                            <div>SEARCH ISSUE</div>
                        </div>
                        <div className='hometemplate__nav-icon' >
                            <AiOutlinePlus className='icon' />
                            <div>CREATE ISSUE</div>
                        </div>
                        <div className='hometemplate__nav-icon end' >
                            <BsQuestionCircle className='icon' />
                            <div>ABOUT</div>
                        </div>
                    </div>
                    <div className='homeTemplate__navContent'>
                        <div className='homeTemplate__navContent-header' >
                            <div className='logo'>{userLogin.name.slice(0, 1).toUpperCase()}</div>
                            <div className='content'>
                                <div>{userLogin.name[0].toUpperCase() + userLogin.name.slice(1)}</div>
                                <div>Software project</div>
                            </div>
                        </div>
                        <MenuItem />
                    </div>
                    <div className='homeTemplate__content'>
                        <Component {...propsRout} />
                    </div>
                </div>
            )
        }} />
    )
}
