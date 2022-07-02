import React from 'react'
import { Route } from 'react-router-dom'
// icon react
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { FiClipboard } from "react-icons/fi";

export default function HomeTemplate(props) {
    const { Component, ...restProps } = props
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
                        <div className='hometemplate__nav-icon'>
                            <AiOutlinePlus className='icon' />
                            <div>CREATE ISSUE</div>
                        </div>
                        <div className='hometemplate__nav-icon end'>
                            <BsQuestionCircle className='icon' />
                            <div>ABOUT</div>
                        </div>
                    </div>
                    <div className='homeTemplate__navContent'>
                        <div className='homeTemplate__navContent-header'>
                            <div className='logo'>J</div>
                            <div className='content'>
                                <div>Jira clone web</div>
                                <div>Software project</div>
                            </div>
                        </div>
                        <div className='homeTemplate__navContent-item'>
                            <FiClipboard className='icon' />
                            <div>Kanban board</div>
                        </div>
                        <div className='homeTemplate__navContent-item'>
                            <AiOutlineSetting className='icon' />
                            <div>Project settings</div>
                        </div>
                    </div>
                    {/* <div className='homeTemplate__content'>
                        <Component {...propsRout} />
                    </div> */}
                </div>
            )
        }} />
    )
}
