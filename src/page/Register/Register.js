import React from 'react'

export default function Register() {
    return (
        <div className='register'>
            <div className='register__content'>
                <div className='register__content-heading'>Join us</div>
                <div className='register__content-item'>
                    <label>Name: </label>
                    <input />
                    <p>is not fit</p>
                </div>
                <div className='register__content-item'>
                    <label>Email: </label>
                    <input />
                    <p>is not fit</p>
                </div>
                <div className='register__content-item'>
                    <label>Phone: </label>
                    <input />
                    <p>is not fit</p>
                </div>
                <div className='register__content-item'>
                    <label>Password: </label>
                    <input type='password' />
                    <p>is not fit</p>
                </div>
                <div className='register__content-item'>
                    <label>Confirm password: </label>
                    <input type='password' />
                    <p>Password must the same!</p>
                </div>
                <div className='register__content-btn'>
                    <button>Sign up</button>
                </div>
                <div className='register__content-signIn'>
                    <p>Already have an account?</p>
                    <button>Sign in</button>
                </div>
            </div>
        </div>
    )
}
