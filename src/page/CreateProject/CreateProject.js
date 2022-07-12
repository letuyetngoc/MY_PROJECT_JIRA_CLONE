import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { PROJECT_CATEGORY_API } from '../../redux/saga/typesSaga/projectCategoryTypes';

export default function CreateProject() {

    const editorRef = useRef(null);
    const dispatch = useDispatch()

    const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer)

    const userLogin = useMemo(() => {
        return JSON.parse(localStorage.getItem('userLogin'))
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch({ type: PROJECT_CATEGORY_API })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
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
                        <input name='projectName' placeholder='Project name' />
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
                        <select name='categoryId' >
                            {arrProjectCategory.map(item => {
                                return <option key={item.id}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <button onClick={handleSubmit}>Create project</button>
            </form>
        </div>
    )
}
