import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { PROJECT_CATEGORY_API } from '../../redux/saga/typesSaga/projectCategoryTypes';
import { UPDATE_PROJECT_API } from '../../redux/saga/typesSaga/projectType';

const ProjectEdit = () => {

    const editorRef = useRef(null);
    const dispatch = useDispatch()

    const { projectDetail } = useSelector(state => state.ProjectReducer)
    const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer)

    const userLogin = useMemo(() => {
        return JSON.parse(localStorage.getItem('userLogin'))
    }, [])

    const [state, setState] = useState({
        id: projectDetail.id,
        creator: projectDetail.creator.id,
        projectName: projectDetail.projectName,
        description: projectDetail.description,
        categoryId: projectDetail.projectCategory.id,
        categoryName: projectDetail.projectCategory.name,
        alias: projectDetail.alias,
    })

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
        dispatch({ type: UPDATE_PROJECT_API, payload: state })
    }
    return (
        <div className='createProject'>
            <form>
                <div className='createProject__heading'>
                    Projects  <span>/</span>  {userLogin.name[0].toUpperCase() + userLogin.name.slice(1)} Board  <span>/</span>  Update Project
                    <div>Project ID: {state.id}</div>
                </div>
                <div className='createProject__item'>
                    <label>Name</label>
                    <div>
                        <input onChange={handleChange} name='projectName' value={state.projectName} placeholder='Project name' />
                    </div>
                </div>

                <div className='createProject__item'>
                    <label>Description</label>
                </div>
                <Editor
                    name='description'
                    onInit={(evt, editor) => { editorRef.current = editor }}
                    initialValue={state.description}
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
                        <select
                            onChange={(e) => {
                                state[e.target.name] = e.target.value
                                setState({ ...state })
                            }}
                            value={state.categoryId}
                            name='categoryId' >
                            {arrProjectCategory.map(item => {
                                return <option key={item.id} value={item.id} >{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                >Update project</button>
            </form>
        </div>
    )
}
export default ProjectEdit
