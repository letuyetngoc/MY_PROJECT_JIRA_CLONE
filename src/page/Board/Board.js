import React, { useEffect, useMemo } from 'react'
import { AiFillGithub } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import DragAndDrop from '../../component/dragAndDrop/DragAndDrop';
import { GET_PROJECT_DETAIL_BOARD_API } from '../../redux/saga/typesSaga/projectType';

export default function Board(props) {
    const dispatch = useDispatch()

    const { projectDetail } = useSelector(state => state.ProjectReducer)

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch({ type: GET_PROJECT_DETAIL_BOARD_API, payload: props.match.params.projectId })
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
                Projects  <span>/</span>  {userLogin.name[0].toUpperCase() + userLogin.name.slice(1)} Board  <span>/</span>  {projectDetail.projectName}
            </div>
            <div className='board__title'>
                <p>{projectDetail.projectName}</p>
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
                    {projectDetail.members?.map(((member, index) => {
                        return (
                            <div key={index} className='board__tabNav-avatar-item' onClick={handleActiveClass}>
                                <div className='avatar'>{member.name.slice(0, 1).toUpperCase()}</div>
                                <div className='text_name' >
                                    {member.name}
                                </div>
                            </div>
                        )
                    }))}
                </div>
                {/* <div className='board__tabNav-menu'>
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
                </div> */}
            </div>
            <div className='board__content'>
                <DragAndDrop props={props} />
            </div>
        </div>
    )
}
