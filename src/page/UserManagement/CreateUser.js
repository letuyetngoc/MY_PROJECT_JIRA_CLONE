import React from 'react'

export default function CreateUser() {
    return (
        <div className='createUser'>
            <form className='createUser__container'>
                <h2>Create User</h2>
                <div className='createUser__item'>
                    <label>Name</label>
                    <input name='name' />
                </div>
                <div className='createUser__item'>
                    <label>Email</label>
                    <input name='email' />
                </div>
                <div className='createUser__item'>
                    <label>Password</label>
                    <input name='password' />
                </div>
                <div className='createUser__item'>
                    <label>Confirm password</label>
                    <input name='password' />
                </div>
                <div className='createUser__item'>
                    <label>Phone Number</label>
                    <input name='phone' />
                </div>
                <div className='createUser__item'>
                    <button className='btn_submit' type='submit'>Submit</button>
                    <button className='btn_cancel'>Cancel</button>
                </div>
            </form>
        </div>
    )
}
