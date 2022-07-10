import React from 'react'
import { useRef } from 'react'
import { AiOutlineSetting } from "react-icons/ai";
import { FiClipboard } from "react-icons/fi";

export default function MenuItem() {

    let menuItemArr = [
        {
            id: 0,
            icon: <FiClipboard />,
            content: 'Kanban board',
        },
        {
            id: 1,
            icon: <AiOutlineSetting />,
            content: 'Project settings',
        },
    ]

    return (
        menuItemArr.map((menuItem, index) => {
            return (
                <div key={index} className={`menuItem menuItem${index}`} onClick={(e) => {
                    document.querySelector(`.menuItem${index}`).classList.add('active')
                    for (let i = 0; i < menuItemArr.length; i++) {
                        if (i !== index) {
                            document.querySelector(`.menuItem${i}`).classList.remove('active')
                        }
                    }
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
