import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { history } from '../../App'

import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Register() {

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    const [typePassword, setTypePassword] = useState('password')
    const [typeConfirmPassword, settypeConfirmPassword] = useState('password')
    const [state, setState] = useState({
        values: {
            name: '',
            email: '',
            phoneNumber: '',
            passWord: '',
            passwordConfirm: '',
        },
        errors: {
            name: '',
            email: '',
            phoneNumber: '',
            passWord: '',
            passwordConfirm: '',
        }
    })

    const handleChange = (e) => {

        const { name, value } = e.target
        let newValues = { ...state.values }
        newValues[name] = value

        let errorMessage = ''
        let regexMail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let regexPhoneNumber = /^[0-9\-\+]{10,11}$/i;
        let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i;

        if (value === '') {
            errorMessage = 'Không được bỏ trống!'
        }
        if (name === 'email') {
            if (!regexMail.test(value)) {
                errorMessage = 'Email không hợp lệ!'
            }
        }
        if (name === 'phoneNumber') {
            if (!regexPhoneNumber.test(value)) {
                errorMessage = 'Vui lòng nhập 9-11 kí tự số, không nhập chữ!'
            }
        }
        if (name === 'passWord') {
            if (!regexPassword.test(value)) {
                errorMessage = 'Mật khẩu chứa ít nhất 6 kí tự, trong đó phải có 1 chữ và 1 số!'
            }
        }
        if (name === 'passwordConfirm') {
            if (value !== state.values.passWord) {
                errorMessage = 'Mật khẩu không trùng khớp!'
            }
        }

        let newErrors = { ...state.errors }
        newErrors[name] = errorMessage

        setState({
            values: newValues,
            errors: newErrors
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(state.values)
    }

    const passWordTag = useRef()
    const passWordConfirmTag = useRef()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
        let { type } = passWordTag.current
        const newType = type === 'password' ? 'text' : 'password'
        setTypePassword(newType)
    }
    const handleShowConfirmPassword = () => {
        setshowConfirmPassword(!showConfirmPassword)
        let { type } = passWordConfirmTag.current
        const newType = type === 'password' ? 'text' : 'password'
        settypeConfirmPassword(newType)
    }

    return (
        <div className='register'>
            <form onSubmit={handleSubmit} className='register__content'>
                <div className='register__content-heading'>Join us</div>
                <div className='register__content-item'>
                    <label>Name: </label>
                    <input onChange={handleChange} id='name' name='name' />
                    <p >{state.errors.name}</p>
                </div>
                <div className='register__content-item'>
                    <label>Email: </label>
                    <input onChange={handleChange} id='email' name='email' />
                    <p >{state.errors.email}</p>
                </div>
                <div className='register__content-item'>
                    <label>Phone: </label>
                    <input onChange={handleChange} id='phoneNumber' name='phoneNumber' />
                    <p >{state.errors.phoneNumber}</p>
                </div>
                <div className='register__content-item'>
                    <label>Password: </label>
                    <input ref={passWordTag} onChange={handleChange} id='passWord' name='passWord' type={typePassword} />
                    <div className='eye_password' onClick={handleShowPassword}>
                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </div>
                    <p >{state.errors.passWord}</p>
                </div>
                <div className='register__content-item'>
                    <label>Confirm password: </label>
                    <input ref={passWordConfirmTag} onChange={handleChange} id='passwordConfirm' name='passwordConfirm' type={typeConfirmPassword} />
                    <div className='eye_password' onClick={handleShowConfirmPassword}>
                        {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </div>
                    <p >{state.errors.passwordConfirm}</p>
                </div>
                <div className='register__content-btn'>
                    <button type='submit'>Sign up</button>
                </div>
                <div className='register__content-signIn'>
                    <p>Already have an account?</p>
                    <button onClick={() => history.push('/login')}>Sign in</button>
                </div>
            </form>
        </div>
    )
}
