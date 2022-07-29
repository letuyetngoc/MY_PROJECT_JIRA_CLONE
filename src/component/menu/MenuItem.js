import React, { useMemo } from 'react'
import { AiOutlineSetting } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { AiOutlineSolution } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { APPEAR_MODAL } from '../../redux/types/PopupModalTypes';
import CreateTask from '../../page/CreateTask/CreateTask';

export default function MenuItem() {
    const dispatch = useDispatch()
    const userLogin = useMemo(() => {
        return JSON.parse(localStorage.getItem('userLogin'))
    }, [])

    let menuItemArr = [
        // {
        //     id: 0,
        //     icon: <FiClipboard />,
        //     content: `${userLogin.name[0].toUpperCase() + userLogin.name.slice(1)} board`,
        //     link: '/board'
        // },
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
        <>
            < div onClick={() => { dispatch({ type: APPEAR_MODAL, payload: <CreateTask /> }) }
            } className='menuItem' >
                <div className='icon'>
                    <AiOutlinePlus />
                </div>
                <div >Create task</div>
            </div >
            {menuItemArr.map((menuItem, index) => {
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
            })}

        </>
    )
}
