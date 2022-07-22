import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Select, InputNumber, Slider } from 'antd';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { FiLink } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Option } from 'antd/lib/mentions';
import { HIDE_MODAL } from '../../redux/types/PopupModalTypes';


export default function TaskDetail() {
    const dispatch = useDispatch()

    const [showEdit, setShowEdit] = useState(false)
    const [textarea, setTextarea] = useState(false)
    const [desc, setDesc] = useState(true)
    const [inputComment, setInputComment] = useState(true)

    const [time, setTime] = useState(
        {
            spending: 0,
            remaining: 0,
            tracking: 0,
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
        }
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return (
        <div className='taskDetail'>
            <div className='taskDetail__heading'>
                <div className='taskDetail__heading-left'>
                    <AiOutlineCheckSquare />
                    <select>
                        <option>Bug</option>
                        <option>Task</option>
                    </select>
                    <div>Task 46</div>
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
                    <div className='taskDetail__heading-item'>
                        <AiOutlineDelete />
                    </div>
                    <div onClick={() => dispatch({ type: HIDE_MODAL })} className='taskDetail__heading-item'>
                        <AiOutlineClose />
                    </div>
                </div>
            </div>
            <div className='taskDetail__content'>
                <div className='taskDetail__content-left'>
                    <div className='taskDetail__content-title'>Each issue has a single reporter but can have multiple assignees</div>
                    <div className='taskDetail__content-left-item'>
                        <label >Description</label>
                        {desc && <div onClick={() => {
                            setShowEdit(true)
                            setDesc(false)
                        }}>ok</div>}
                        {showEdit && <div className='editor'>
                            <Editor
                                name='description'
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue=""
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
                                <button>Save</button>
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
                            <div className='avatar'>N</div>
                            <div className='content' >
                                {inputComment && <div className='input'>
                                    <input onClick={() => {
                                        setTextarea(true)
                                        setInputComment(false)
                                    }} placeholder='Add a comment' />
                                    <div className='pro_tip'>
                                        <span>Pro tip:</span> press <span>M</span> to comment
                                    </div>
                                </div>}
                                {textarea && <div className='textarea'>
                                    <textarea id='textarea_comment' style={{ height: '61px' }} placeholder='Add a comment'></textarea>
                                    <div className='textarea__btn'>
                                        <button>Save</button>
                                        <button onClick={() => {
                                            setTextarea(false)
                                            setInputComment(true)
                                        }}>Cancel</button>
                                    </div>
                                </div>}
                            </div>

                        </div>
                        <div className='block_comment-sent'>
                            <div className='block_comment-avatar'>N</div>
                            <div className='block_comment-content'>
                                <div className='content-heading'>
                                    <div>Ngoc Le</div>
                                    <div>18 days ago</div>
                                </div>
                                <div className='content-body'>
                                    An old silent pond...
                                    A frog jumps into the pond,
                                    splash! Silence again.
                                </div>
                                <div className='content-funtion'>
                                    <div>Edit</div>
                                    <div> . </div>
                                    <div>Delete</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='taskDetail__content-right'>
                    <div className='taskDetail__content-right-item'>
                        <label>STATUS</label>
                        <select>
                            <option>Backlock</option>
                            <option>Inporgress</option>
                        </select>
                    </div>
                    <div className='taskDetail__content-right-item'>
                        <label>ASSIGNEES</label>
                        <Select
                            mode="multiple"
                            placeholder="Unassigned"
                            // value={selectedItems}
                            // onChange={setSelectedItems}
                            style={{
                                width: '100%',
                            }}
                        >
                            <Select.Option key='2' >
                                Ngoc
                            </Select.Option>
                            <Select.Option key='3' >
                                Minh
                            </Select.Option>
                            <Select.Option key='4' >
                                Minh1
                            </Select.Option>
                            <Select.Option key='5' >
                                Minh2
                            </Select.Option>
                        </Select>
                    </div>
                    <div className='taskDetail__content-right-item'>
                        <label>PRIORITY</label>
                        <Select style={{ width: '100%' }}>
                            <Select.Option key='0'>Medium</Select.Option>
                            <Select.Option key='1'>Hight</Select.Option>
                        </Select>
                    </div>
                    <div className='taskDetail__content-right-item'>
                        <label>ORIGINAL ESTIMATE (HOURS)</label>
                        <input />
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
                                    min={0}
                                    max={100}
                                    onChange={(newValue) => {
                                        let newValue1 = newValue
                                        time.spending = newValue1
                                        time.tracking = newValue1 * 100 / (newValue1 + time.remaining)
                                        setTime({ ...time })
                                    }}
                                />
                            </div>
                            <div className='time_tracking-input-item'>
                                <label>Time remaining</label>
                                <InputNumber
                                    style={{ height: '32px' }}
                                    min={0}
                                    max={100}
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
                    <br />
                    <hr />
                    <br />
                    <div className='taskDetail__content-right-item'>
                        <p>Created at 18 days ago</p>
                        <p>Updated at 4 hours ago</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
