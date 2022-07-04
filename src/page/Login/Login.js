import React from 'react'
// react icon
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

export default function Login() {
    return (
        <div className='login'>
            <div className='login__heading'>Login</div>
            <div className='login__content'>
                <div className='login__content-item'>
                    <label><MdEmail /></label>
                    <input placeholder='Email' />
                </div>
                <hr />
                <div className='login__content-item'>
                    <label><RiLockPasswordFill /></label>
                    <input type='password' placeholder='Password' />
                </div>
                <hr />
                <div className='login__content-btn'>
                    <button>Sign in</button>
                </div>
                <div className='login__content-signup'>
                    <p>Don't have an acount?</p>
                    <button>Sign up</button>
                </div>
            </div>
        </div>
    )
}
