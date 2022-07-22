import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { HIDE_MODAL } from '../../redux/types/PopupModalTypes'
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { useRef } from 'react';
import { MESSAGE_APPEAR } from '../../redux/types/MessageTypes';
import { EDIT_USER_API } from '../../redux/saga/typesSaga/UserTypesSaga';

export default function EditUser({ userDetail }) {

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [typePassword, setTypePassword] = useState('password')
    const [typeConfirmPassword, setTypeConfirmPassword] = useState('password')

    const [state, setState] = useState(
        {
            values: {
                id: userDetail.id,
                passWord: '',
                passWordConfirm: '',
                email: userDetail.email,
                name: userDetail.name,
                phoneNumber: userDetail.phone,
            }
            ,
            errors: {
                id: '',
                passWord: '',
                passWordConfirm: '',
                email: '',
                name: '',
                phoneNumber: '',
            }
        }
    )

    const handeChange = (e) => {
        const { name, value } = e.target
        const newValues = { ...state.values }
        newValues[name] = value

        let messageError = ''

        let regexMail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let regexPhoneNumber = /^[0-9\-\+]{10,11}$/i;
        let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i;

        if (value === '') {
            messageError = 'Không được để trống!'
        }
        if (name === 'email') {
            if (!regexMail.test(value)) {
                messageError = 'Email không hợp lệ!'
            }
        }
        if (name === 'passWord') {
            if (!regexPassword.test(value)) {
                messageError = 'Mật khẩu chứa ít nhất 6 kí tự, trong đó phải có 1 chữ và 1 số!'
            }
        }
        if (name === 'passWordConfirm') {
            if (value !== state.values.passWord) {
                messageError = 'Mật khẩu không trùng khớp!'
            }
        }
        if (name === 'phoneNumber') {
            if (!regexPhoneNumber.test(value)) {
                messageError = 'Vui lòng nhập 9-11 kí tự số, không nhập chữ!'
            }
        }

        const newErrors = { ...state.errors }
        newErrors[name] = messageError

        setState({
            values: newValues,
            errors: newErrors
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { errors, values } = state

        for (let i in errors) {
            if (errors[i] !== '') {
                dispatch({ type: MESSAGE_APPEAR, payload: <p>Thông tin không hợp lệ!</p> })
                return
            }
        }

        for (let i in values) {
            if (values[i] === '') {
                dispatch({ type: MESSAGE_APPEAR, payload: <p>Bạn chưa điền đủ thông tin!</p> })
                return
            }
        }
        dispatch({ type: EDIT_USER_API, payload: state.values })
        // console.log('state', state.values)
    }

    const passwordTag = useRef()
    const passwordConfirmTag = useRef()

    const handeShowPassword = () => {
        setShowPassword(!showPassword)
        const newType = passwordTag.current.type === 'password' ? 'text' : 'password'
        setTypePassword(newType)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
        const newType = passwordConfirmTag.current.type === 'password' ? 'text' : 'password'
        setTypeConfirmPassword(newType)
    }
    return (
        <div className='editUser'>
            <form className='editUser__container'>
                <h2>Create User</h2>
                <div className='editUser__item'>
                    <label>Name</label>
                    <input name='name' value={state.values.name} onChange={handeChange} />
                    <p>{state.errors.name}</p>
                </div>
                <div className='editUser__item'>
                    <label>Email</label>
                    <input name='email' value={state.values.email} onChange={handeChange} />
                    <p>{state.errors.email}</p>
                </div>
                <div className='editUser__item editUser__item-password'>
                    <label>Password</label>
                    <input name='passWord' ref={passwordTag} type={typePassword} value={state.values.passWord} onChange={handeChange} />
                    <p>{state.errors.passWord}</p>
                    <div className='eye_password' onClick={handeShowPassword}>
                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </div>
                </div>
                <div className='editUser__item editUser__item-password' >
                    <label>Confirm password</label>
                    <input name='passWordConfirm' ref={passwordConfirmTag} type={typeConfirmPassword} onChange={handeChange} />
                    <p>{state.errors.passWordConfirm}</p>
                    <div className='eye_password' onClick={handleShowConfirmPassword}>
                        {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </div>
                </div>
                <div className='editUser__item'>
                    <label>Phone Number</label>
                    <input name='phoneNumber' value={state.values.phoneNumber} onChange={handeChange} />
                    <p>{state.errors.phoneNumber}</p>
                </div>
                <div className='editUser__item'>
                    <button className='btn_submit' type='submit' onClick={handleSubmit}>Submit</button>
                    <button className='btn_cancel' onClick={() => dispatch({ type: HIDE_MODAL })}>Cancel</button>
                </div>
            </form >
        </div >
    )
}
