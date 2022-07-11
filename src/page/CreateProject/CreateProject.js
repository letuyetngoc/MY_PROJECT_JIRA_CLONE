import React, { useMemo } from 'react'

export default function CreateProject() {

    const userLogin = useMemo(() => {
        return JSON.parse(localStorage.getItem('userLogin'))
    }, [])

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
                    <div>
                        <input name='description' />
                    </div>
                    <p>Describe the project in as much detail as you'd like.</p>
                </div>
                <div className='createProject__item'>
                    <label>Project Category</label>
                    <div>
                        <select name='categoryId' >
                            <option >Software</option>
                            <option >Marketing</option>
                            <option>Bussiness</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}
