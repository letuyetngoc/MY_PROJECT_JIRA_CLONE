import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { PROJECT_CATEGORY_API } from '../../redux/saga/typesSaga/projectCategoryTypes';
import { CREATE_PROJECT_API } from '../../redux/saga/typesSaga/projectType';

export default function CreateProject() {

    const editorRef = useRef(null);
    const dispatch = useDispatch()

    const [state, setState] = useState({
        projectName: '',
        description: '',
        categoryId: '1',
        alias: 'string',
    })

    const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer)

    const userLogin = useMemo(() => {
        return JSON.parse(localStorage.getItem('userLogin'))
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch({ type: PROJECT_CATEGORY_API })
    }, [])

    const handleChange = (e) => {
        state[e.target.name] = e.target.value
        setState({ ...state })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editorRef.current) {
            state.description = editorRef.current.getContent()
            setState({ ...state })
        }
        console.log(state)
        dispatch({ type: CREATE_PROJECT_API, payload: state })
    }
    return (
        <div className='createProject'>

            <form>
                <div className='createProject__heading'>
                    Projects  <span>/</span>  {userLogin.name[0].toUpperCase() + userLogin.name.slice(1)} Board  <span>/</span>  Create Project
                    <div>Create Project</div>
                </div>
                <div className='createProject__item'>
                    <label>Name</label>
                    <div>
                        <input onChange={handleChange} name='projectName' placeholder='Project name' />
                    </div>
                </div>

                <div className='createProject__item'>
                    <label>Description</label>
                </div>
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
                <p>Describe the project in as much detail as you'd like.</p>
                <div className='createProject__item'>
                    <label>Project Category</label>
                    <div>
                        <select onChange={(e) => {
                            state[e.target.name] = e.target.options.selectedIndex + 1
                            setState({ ...state })
                        }} name='categoryId' >
                            {arrProjectCategory.map(item => {
                                return <option key={item.id} id={item.id}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <button onClick={handleSubmit}>Create project</button>
            </form>
        </div>
    )
}
