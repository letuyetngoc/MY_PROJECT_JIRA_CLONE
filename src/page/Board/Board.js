import React, { useMemo } from 'react'
import { AiFillGithub } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

export default function Board() {

    const handleActiveClass = e => {
        e.target.classList.toggle('active')
    }
    const userLogin = useMemo(() => {
        return JSON.parse(localStorage.getItem('userLogin'))
    }, [])

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
                <div className='board__content-item'>
                    <div className='board__content-item-heading'>BACKLOG 1 of 2</div>
                    <div className='board__content-item-content'></div>
                </div>
                <div className='board__content-item'>
                    <div className='board__content-item-heading'>SELECTED FOR DEVELOPMENT 0 of 3</div>
                    <div className='board__content-item-content'></div>
                </div>
                <div className='board__content-item'>
                    <div className='board__content-item-heading'>IN PROGRESS 1 of 2</div>
                    <div className='board__content-item-content'></div>
                </div>
                <div className='board__content-item'>
                    <div className='board__content-item-heading'>DONE 1 of 2</div>
                    <div className='board__content-item-content'></div>
                </div>

            </div>
        </div>
    )
}
