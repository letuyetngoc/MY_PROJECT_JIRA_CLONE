import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputNumber, Slider, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { HIDE_MODAL } from '../../redux/types/PopupModalTypes';
import { CREATE_TASK_API, GET_ALL_PRIORITY_API, GET_ALL_PROJECT_API, GET_ALL_STATUS_API, GET_ALL_TASK_TYPES_API } from '../../redux/saga/typesSaga/projectType';
import { GET_USER_API } from '../../redux/saga/typesSaga/UserTypesSaga';
import { MESSAGE_APPEAR } from '../../redux/types/MessageTypes';

export default function CreateTask() {
    const dispatch = useDispatch()
    const { Option } = Select;

    const editorRef = useRef(null);

    const [projectMembers, setProjectMember] = useState([])

    const { arrStatus, arrPriority, arrTaskTypes, arrProject } = useSelector(state => state.ProjectReducer)

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_API })
        dispatch({ type: GET_ALL_STATUS_API })
        dispatch({ type: GET_ALL_PRIORITY_API })
        dispatch({ type: GET_ALL_TASK_TYPES_API })
    }, [])

    const [time, setTime] = useState(
        {
            spending: 0,
            remaining: 0,
            tracking: 0,
        }
    );
    const [values, setValues] = useState({
        listUserAsign: [
            0
        ],
        taskName: '',
        description: '',
        statusId: '1',
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        projectId: 0,
        typeId: 1,
        priorityId: 1,
    })


    const handleChange = (e) => {
        const newValue = { ...values }
        newValue[e.target.name] = e.target.value
        setValues(newValue)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (editorRef.current) {
            values.description = editorRef.current.getContent()
            setValues({ ...values })
        }
        console.log(values)
        if (values.taskName == '') {
            dispatch({ type: MESSAGE_APPEAR, payload: <p>Task name is required!</p> })
            return
        }
        dispatch({ type: CREATE_TASK_API, payload: values })
    }
    return (
        <div className='createTask'>
            <form>
                <div className='createTask__heading'>
                    Create task
                </div>
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <label>Project</label>
                        <select onChange={(e) => {
                            const projectItem = JSON.parse(e.target.value)
                            setProjectMember(projectItem.members)
                            setValues({ ...values, projectId: projectItem.id })
                        }}>
                            {arrProject.map((item, index) => <option value={JSON.stringify(item)}
                                key={index}>{item.projectName}</option>)}
                        </select>
                    </div>
                </div>
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <label>Task name</label>
                        <input name='taskName' onChange={handleChange} />
                    </div>
                </div>
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <label>Status</label>
                        <select onChange={handleChange} name='statusId'>
                            {arrStatus.map(item => {
                                return <option key={item.statusId} value={item.statusId} >{item.statusName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <label>Priority</label>
                        <select onChange={handleChange} name='priorityId'>
                            {arrPriority.map(item => {
                                return <option key={item.priorityId} value={Number(item.priorityId)} >{item.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='createTask__item'>
                        <label>Task type</label>
                        <select onChange={handleChange} name='typeId'>
                            {arrTaskTypes.map(item => <option key={item.id} value={Number(item.id)}>{item.taskType}</option>)}
                        </select>
                    </div>
                </div>
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <div >
                            <label>Assignees</label>
                            <Select
                                mode="tags"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                onChange={value => setValues({ ...values, listUserAsign: value })}
                            >
                                {projectMembers && projectMembers.map((item, index) => <Option value={`${item.userId}`} key={index}>{item.name}</Option>)}
                            </Select>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <label>Original Estimate</label>
                            <InputNumber onChange={value => setValues({ ...values, originalEstimate: value })} style={{ width: '100%', height: '32px' }} min={0} max={100} />
                        </div>
                    </div>
                    <div className='createTask__item'>
                        <div className='time_tracking'>
                            <label>Time tracking</label>
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
                                <div>
                                    <label>Time spend</label>
                                    <InputNumber
                                        style={{ height: '32px' }}
                                        min={0}
                                        max={100}
                                        value={time.spending}
                                        onChange={async (newValue) => {
                                            let newValue1 = newValue
                                            time.spending = newValue1
                                            time.tracking = newValue1 * 100 / (newValue1 + time.remaining)
                                            await setTime({ ...time })
                                            await setValues({ ...values, timeTrackingSpent: time.spending })
                                        }}
                                    />
                                </div>
                                <div>
                                    <label>Time remaining</label>
                                    <InputNumber
                                        style={{ height: '32px' }}
                                        min={0}
                                        max={100}
                                        value={time.remaining}
                                        onChange={async (newValue) => {
                                            let newValue1 = newValue
                                            time.remaining = newValue1
                                            time.tracking = time.spending * 100 / (time.spending + newValue1)
                                            await setTime({ ...time })
                                            await setValues({ ...values, timeTrackingRemaining: time.remaining })

                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <label>Description</label>
                        <Editor
                            name='description'
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue=""
                            init={{
                                height: 150,
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
                    </div>
                </div>
                <div className='createTask__group'>
                    <button type='submit' className='btn btn_submit' onClick={handleSubmit}>Create task</button>
                    <button className='btn btn_cancel' onClick={() => dispatch({ type: HIDE_MODAL })}>Cancel</button>
                </div>
            </form >
        </div >
    )
}
