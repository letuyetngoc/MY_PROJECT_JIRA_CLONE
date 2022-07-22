import React, { useMemo } from 'react'
import { AiOutlineSetting } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { AiOutlineSolution } from "react-icons/ai";
import { FiClipboard } from "react-icons/fi";
import { NavLink } from 'react-router-dom';

export default function MenuItem() {

    const userLogin = useMemo(() => {
        return JSON.parse(localStorage.getItem('userLogin'))
    }, [])

    let menuItemArr = [
        {
            id: 0,
            icon: <FiClipboard />,
            content: `${userLogin.name[0].toUpperCase() + userLogin.name.slice(1)} board`,
            link: '/board'
        },
        {
            id: 1,
            icon: <AiOutlineSetting />,
            content: 'Create project',
            link: '/createProject'
        },
        {
            id: 2,
            icon: <AiOutlineSolution />,
            content: 'Project Management',
            link: '/projectManagement'
        },
        {
            id: 3,
            icon: <FiUsers />,
            content: 'User Management',
            link: '/userManagement'
        },
    ]

    return (
        menuItemArr.map((menuItem, index) => {
            return (
                <NavLink key={index} to={menuItem.link} className='menuItem' activeClassName='menuItem active'>
                    <div className='icon'>
                        {menuItem.icon}
                    </div>
                    <div >
                        {menuItem.content}
                    </div>
                </NavLink>
            )
        })


    )
}
