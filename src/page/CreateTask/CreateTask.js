import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputNumber, Slider, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { HIDE_MODAL } from '../../redux/types/PopupModalTypes';

export default function CreateTask() {
    const dispatch = useDispatch()
    const { Option } = Select;
    const children = [];
    const editorRef = useRef(null);

    const [time, setTime] = useState(
        {
            spending: 0,
            remaining: 0,
            tracking: 0,
        }
    );

    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className='createTask'>
            <form>
                <div className='createTask__heading'>
                    Create task
                </div>
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <label>Project</label>
                        <select>
                            <option>task 1</option>
                            <option>task 2</option>
                        </select>
                    </div>
                </div>
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <label>Task name</label>
                        <input />
                    </div>
                </div>
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <label>Status</label>
                        <select>
                            <option>Status 1</option>
                            <option>Status 2</option>
                        </select>
                    </div>
                </div>
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <label>Priority</label>
                        <select>
                            <option>Status 1</option>
                            <option>Status 2</option>
                        </select>
                    </div>
                    <div className='createTask__item'>
                        <label>Task type</label>
                        <select>
                            <option>Status 1</option>
                            <option>Status 2</option>
                        </select>
                    </div>
                </div>
                <div className='createTask__group'>
                    <div className='createTask__item'>
                        <div >
                            <label>Assignees</label>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                onChange={handleChange}
                            >
                                {children}
                            </Select>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <label>Original Estimate</label>
                            <InputNumber onChange={handleChange} style={{ width: '100%', height: '32px' }} min={0} max={100} />
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
                                        onChange={(newValue) => {
                                            let newValue1 = newValue
                                            time.spending = newValue1
                                            time.tracking = newValue1 * 100 / (newValue1 + time.remaining)
                                            setTime({ ...time })
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
                                        onChange={(newValue) => {
                                            let newValue1 = newValue
                                            time.remaining = newValue1
                                            time.tracking = time.spending * 100 / (time.spending + newValue1)
                                            setTime({ ...time })
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
                    <button className='btn btn_submit'>Create task</button>
                    <button className='btn btn_cancel' onClick={() => dispatch({ type: HIDE_MODAL })}>Cancel</button>
                </div>
            </form >
        </div >
    )
}
