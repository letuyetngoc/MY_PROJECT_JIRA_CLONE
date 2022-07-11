import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react'
import { AiOutlineSetting } from "react-icons/ai";
import { FiClipboard } from "react-icons/fi";
import { history } from '../../App';

export default function MenuItem() {

    let menuItemArr = [
        {
            id: 0,
            icon: <FiClipboard />,
            content: 'Kanban board',
            link: '/board'
        },
        {
            id: 1,
            icon: <AiOutlineSetting />,
            content: 'Project settings',
            link: '/settings'
        },
    ]
    useEffect(() => {
        document.querySelector(`.menuItem0`).classList.add('active')
    }, [])

    return (
        menuItemArr.map((menuItem, index) => {
            return (
                <div key={index} className={`menuItem menuItem${index}`} onClick={() => {
                    document.querySelector(`.menuItem${index}`).classList.add('active')
                    for (let i = 0; i < menuItemArr.length; i++) {
                        if (i !== index) {
                            document.querySelector(`.menuItem${i}`).classList.remove('active')
                        }
                    }
                    history.push(`${menuItem.link}`)
                }
                }>
                    <div className='icon'>
                        {menuItem.icon}
                    </div>
                    <div >
                        {menuItem.content}
                    </div>
                </div >
            )
        })


    )
}
