import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Select, InputNumber, Slider } from 'antd';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { FiLink } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { HIDE_MODAL } from '../../redux/types/PopupModalTypes';
import { useSelector } from 'react-redux';
import { GET_USER_BY_PROJECTID_API } from '../../redux/saga/typesSaga/UserTypesSaga';
import { REMOVE_TASK_API, UPDATE_TASK_API } from '../../redux/saga/typesSaga/projectType';
import { MESSAGE_ALERT_APPEAR, MESSAGE_ALERT_DISAPPEAR } from '../../redux/types/MessageTypes';
import AlertMessage from '../../component/message/AlertMessage';
import { DELETE_COMMENT_API, GET_ALL_COMMENTS_API, INSERT_COMMENT_API, UPDATE_COMMENT_API } from '../../redux/saga/typesSaga/commentTypes';
import { useMemo } from 'react';
import BlockComment from '../../component/comment/BlockComment';


export default function TaskDetail({ taskDetail }) {

    const dispatch = useDispatch()
    const { arrUsersByProjectId } = useSelector(state => state.UserReducer)
    const { arrAllComment } = useSelector(state => state.CommentReducer)

    const user = useMemo(() => {
        return JSON.parse(localStorage.getItem('userLogin'))
    }, [])

    const [showEdit, setShowEdit] = useState(false)
    const [textarea, setTextarea] = useState(false)
    const [desc, setDesc] = useState(true)
    const [inputComment, setInputComment] = useState(true)

    const [state, setState] = useState({
        membersTask: taskDetail.assigness,
        listUserAsign: taskDetail.assigness.map(item => item.id),
        taskId: taskDetail.taskId,
        taskName: taskDetail.taskName,
        description: taskDetail.description,
        statusId: taskDetail.statusId,
        originalEstimate: taskDetail.originalEstimate,
        timeTrackingSpent: taskDetail.timeTrackingSpent,
        timeTrackingRemaining: taskDetail.timeTrackingRemaining,
        projectId: taskDetail.projectId,
        typeId: taskDetail.typeId,
        priorityId: taskDetail.priorityId,
    })
    const [comment, setCommment] = useState('')


    const [time, setTime] = useState(
        {
            spending: 0,
            remaining: 0,
            tracking: state.timeTrackingSpent * 100 / (state.timeTrackingSpent + state.timeTrackingRemaining),
        }
    );

    const editorRef = useRef(null);

    useEffect(() => {
        const handleKeyUp = (e) => {
            let textareaCommentTag
            if (e.key === 'm' || e.key === 'M') {
                setTextarea(true)
                setInputComment(false)
                textareaCommentTag = document.querySelector('#textarea_comment')
            }
            textareaCommentTag.focus()
            setCommment('')
        }
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useEffect(() => {
        dispatch({ type: GET_USER_BY_PROJECTID_API, payload: taskDetail.projectId })
    }, [])

    const onOk = () => {
        dispatch({ type: REMOVE_TASK_API, payload: { taskId: taskDetail.taskId, projectId: taskDetail.projectId } })
        dispatch({ type: MESSAGE_ALERT_DISAPPEAR })

    }
    useEffect(() => {
        dispatch({ type: GET_ALL_COMMENTS_API, payload: taskDetail.taskId })
    }, [comment])

    const onCancel = () => {
        dispatch({ type: MESSAGE_ALERT_DISAPPEAR })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('state', state)
        dispatch({ type: UPDATE_TASK_API, payload: state })
    }
    return (
        <div className='taskDetail'>
            <AlertMessage onOk={onOk} onCancle={onCancel} >
                <p>Are you sure to delete?</p>
            </AlertMessage>
            <form>
                <div className='taskDetail__heading'>
                    <div className='taskDetail__heading-left'>
                        {state.typeId == 2 ? <AiOutlineCheckSquare style={{ color: 'blue', fontSize: '18px' }} />
                            : <RiErrorWarningFill style={{ color: 'red', fontSize: '18px' }} />}
                        <select value={state.typeId} onChange={(e) => {
                            state.typeId = e.target.value
                            setState({ ...state })
                        }}>
                            <option value='1'>Bug</option>
                            <option value='2'>Task</option>
                        </select>
                        <div>Task: {taskDetail.taskId}</div>
                    </div>
                    <div className='taskDetail__heading-right'>
                        <div className='taskDetail__heading-item'>
                            <IoPaperPlaneOutline />
                            <div>Give feedback</div>
                        </div>
                        <div className='taskDetail__heading-item'>
                            <FiLink />
                            <div>Copy link</div>
                        </div>
                        <div onClick={() => {
                            dispatch({ type: MESSAGE_ALERT_APPEAR })

                        }} className='taskDetail__heading-item'>
                            <AiOutlineDelete />
                        </div>
                        <div onClick={() => dispatch({ type: HIDE_MODAL })} className='taskDetail__heading-item'>
                            <AiOutlineClose />
                        </div>
                    </div>
                </div>
                <div className='taskDetail__content'>
                    <div className='taskDetail__content-left'>
                        <div className='taskDetail__content-title' >{state.taskName}</div>
                        <div className='taskDetail__content-left-item'>
                            <label >Description</label>
                            {desc && <div onClick={() => {
                                setShowEdit(true)
                                setDesc(false)
                            }} dangerouslySetInnerHTML={{ __html: state.description }}></div>}
                            {showEdit && <div className='editor'>
                                <Editor
                                    name='description'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={state.description}
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                                <div className='editor__btn'>
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        if (editorRef.current) {
                                            state.description = editorRef.current.getContent()
                                            setState({ ...state })
                                        }
                                    }}>Save</button>
                                    <button onClick={() => {
                                        setDesc(true)
                                        setShowEdit(false)
                                    }}>Cancel</button>
                                </div>
                            </div>}
                        </div>
                        <div className='taskDetail__content-left-item'>
                            <label>Comment</label>
                            <div className='block_comment'>
                                <div className='avatar'>{user.name.slice(0, 1).toUpperCase()}</div>
                                <div className='content' >
                                    {inputComment && <div className='input' onClick={() => {
                                        setTextarea(true)
                                        setInputComment(false)
                                        setCommment('')
                                    }}>
                                        <input placeholder='Add a comment' />
                                        <div className='pro_tip'>
                                            <span>Pro tip:</span> press <span>M</span> to comment
                                        </div>
                                    </div>}
                                    {textarea && <div className='textarea'>
                                        <textarea value={comment} onChange={e => setCommment(e.target.value)} id='textarea_comment' style={{ height: '61px' }} placeholder='Add a comment'></textarea>
                                        <div className='textarea__btn'>
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                dispatch({ type: INSERT_COMMENT_API, payload: { taskId: taskDetail.taskId, contentComment: comment } })
                                                setTextarea(false)
                                                setInputComment(true)
                                            }}>Save</button>
                                            <button onClick={() => {
                                                setTextarea(false)
                                                setInputComment(true)
                                            }}>Cancel</button>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            {arrAllComment?.map((comment, index) => {
                                return <div key={index}><BlockComment comment={comment} /></div>
                            })}
                        </div>

                    </div>
                    <div className='taskDetail__content-right'>
                        <div className='taskDetail__content-right-item'>
                            <label>STATUS</label>
                            <select value={state.statusId} onChange={(e) => {
                                state.statusId = e.target.value
                                setState({ ...state })
                            }}>
                                <option value='1'>BACKLOG</option>
                                <option value='2'>SELECTED FOR DEVELOPMENT</option>
                                <option value='3'>IN PROGRESS</option>
                                <option value='4'>DONE</option>
                            </select>
                        </div>
                        <div className='taskDetail__content-right-item'>
                            <label>ASSIGNEES</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {state.membersTask.map((item, index) => <div className='user' key={index}>
                                    <span onClick={() => {
                                        state.listUserAsign = state.listUserAsign.filter(id => id != item.id)
                                        state.membersTask = state.membersTask.filter(user => user.id != item.id)
                                        setState({ ...state })
                                    }}>x </span>
                                    {item.name}</div>)}
                            </div>
                            <div className='addUsser' >
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="+ Add more user"
                                    onChange={(value) => {
                                        const newValue = JSON.parse(value)

                                        const checkUserInTask = state.listUserAsign.includes(newValue.userId)

                                        if (!checkUserInTask) {

                                            state.membersTask.push({ id: newValue.userId, name: newValue.name })
                                            state.listUserAsign.push(Number(newValue.userId))
                                        }

                                        setState({ ...state })
                                    }}
                                    tokenSeparators={[',']}
                                >
                                    {arrUsersByProjectId.map(item => <Select.Option key={JSON.stringify(item)}>{item.name}</Select.Option>)}
                                </Select>
                            </div>

                        </div>
                        <div className='taskDetail__content-right-item'>
                            <label>PRIORITY</label>
                            <select value={state.priorityId} onChange={(e) => {
                                state.priorityId = e.target.value
                                setState({ ...state })
                            }}>
                                <option value='1'>Hight</option>
                                <option value='2'>Medium</option>
                                <option value='3'>Low</option>
                                <option value='4'>Lowest</option>
                            </select>
                        </div>
                        <div className='taskDetail__content-right-item'>
                            <label>ORIGINAL ESTIMATE (HOURS)</label>
                            <input value={state.originalEstimate} onChange={e => {
                                state.originalEstimate = e.target.value
                                setState({ ...state })
                            }} />
                        </div>
                        <div className='taskDetail__content-right-item'>
                            <label>TIME TRACKING</label>
                            <Slider
                                min={1}
                                max={100}
                                value={typeof time.tracking === 'number' ? time.tracking : 0}
                            />
                            <div className='time_tracking-text'>
                                <div>{time.spending}h logged</div>
                                <div>{time.remaining}h remaining</div>
                            </div>
                            <div className='time_tracking-input'>
                                <div className='time_tracking-input-item'>
                                    <label>Time spend</label>
                                    <InputNumber
                                        style={{ height: '32px' }}
                                        value={state.timeTrackingSpent}
                                        min={0}
                                        max={100}
                                        onChange={(newValue) => {
                                            let newValue1 = newValue
                                            time.spending = newValue1
                                            time.tracking = newValue1 * 100 / (newValue1 + time.remaining)
                                            setTime({ ...time })
                                            state.timeTrackingSpent = time.spending
                                            setState({ ...state })
                                        }}
                                    />
                                </div>
                                <div className='time_tracking-input-item'>
                                    <label>Time remaining</label>
                                    <InputNumber
                                        style={{ height: '32px' }}
                                        value={state.timeTrackingRemaining}
                                        min={0}
                                        max={100}
                                        onChange={(newValue) => {
                                            let newValue1 = newValue
                                            time.remaining = newValue1
                                            time.tracking = time.spending * 100 / (time.spending + newValue1)
                                            setTime({ ...time })
                                            state.timeTrackingRemaining = time.remaining
                                            setState({ ...state })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className='taskDetail__content-right-item'>
                            <p>Created at 18 days ago</p>
                            <p>Updated at 4 hours ago</p>
                        </div>
                    </div>
                </div>
                <button type='submit' onClick={handleSubmit} className='taskDetail__button_update'>Update project</button>
            </form>
        </div>
    )
}
