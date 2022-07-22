import React, { useEffect, useMemo } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AiFillGithub } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import DragAndDrop from '../../component/dragAndDrop/DragAndDrop';

export default function Board() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const userLogin = useMemo(() => {
        return JSON.parse(localStorage.getItem('userLogin'))
    }, [])

    const handleActiveClass = e => {
        e.target.classList.toggle('active')
    }

    return (
        <div className='board'>
            <div className='board__heading'>
                Projects  <span>/</span>  {userLogin.name[0].toUpperCase() + userLogin.name.slice(1)} Board
            </div>
            <div className='board__title'>
                <p>{userLogin.name[0].toUpperCase() + userLogin.name.slice(1)} Board</p>
                <a target='blank' href='https://github.com/letuyetngoc/MY_PROJECT_JIRA_CLONE'>
                    <AiFillGithub className='icon' />
                    <span>Github Repo</span>
                </a>
            </div>
            <div className='board__tabNav'>
                <div className='board__tabNav-search'>
                    <FiSearch className='icon' />
                    <input />
                </div>
                <div className='board__tabNav-avatar'>
                    <div className='board__tabNav-avatar-item' style={{ backgroundImage: `url('https://picsum.photos/200')` }} onClick={handleActiveClass}>
                    </div>
                    <div className='board__tabNav-avatar-item ' style={{ backgroundImage: `url('https://picsum.photos/200')` }} onClick={handleActiveClass}>
                    </div>
                    <div className='board__tabNav-avatar-item' style={{ backgroundImage: `url('https://picsum.photos/200')` }} onClick={handleActiveClass}>
                    </div>
                </div>
                <div className='board__tabNav-menu'>
                    <div className='board__tabNav-menu-item' onClick={e => {
                        e.target.classList.toggle('active')
                        document.querySelector('.clear').classList.toggle('show')
                        if (document.querySelector('.board__tabNav-menu-item.active') !== null) {
                            document.querySelector('.clear').classList.add('show')
                        }
                    }}
                    >
                        Only My Issues</div>
                    <div className='board__tabNav-menu-item' onClick={e => {
                        e.target.classList.toggle('active')
                        document.querySelector('.clear').classList.toggle('show')

                        if (document.querySelector('.board__tabNav-menu-item.active') !== null) {
                            document.querySelector('.clear').classList.add('show')
                        }
                    }}
                    >
                        Recently Updated</div>

                    <div className='board__tabNav-menu-item clear' onClick={e => {
                        e.target.classList.remove('show')
                        document.querySelector('.board__tabNav-menu-item.active')?.classList.remove('active')
                        document.querySelector('.board__tabNav-menu-item.active')?.classList.remove('active')
                    }}>
                        <span>|</span>Clear All
                    </div>
                </div>
            </div>
            <div className='board__content'>
                <DragAndDrop />
            </div>
        </div>
    )
}
