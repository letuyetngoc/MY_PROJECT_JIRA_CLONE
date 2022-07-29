import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SIGN_UP_API } from '../../redux/saga/typesSaga/UserTypesSaga'
import { MESSAGE_APPEAR } from '../../redux/types/MessageTypes'
import { HIDE_MODAL } from '../../redux/types/PopupModalTypes'

export default function CreateUser() {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        values: {
            email: '',
            passWord: '',
            confirmPassword: '',
            name: '',
            phoneNumber: ''
        },
        errors: {
            email: '',
            passWord: '',
            confirmPassword: '',
            name: '',
            phoneNumber: ''
        }
    })
    // console.log('state', state)
    const handleChange = (e) => {

        let { values, errors } = state
        const { name, value } = e.target

        let newValues = { ...values }

        newValues[name] = value



        let messageError = ''
        let regexMail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let regexPhoneNumber = /^[0-9\-\+]{10,11}$/i;
        let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i;

        if (value == '') {
            messageError = 'Không được bỏ trống!'

        }
        if (name === 'email') {
            if (!regexMail.test(value)) {
                messageError = 'Email không đúng định dạng!'
            }
        }
        if (name === 'phoneNumber') {
            if (!regexPhoneNumber.test(value)) {
                messageError = 'Vui lòng nhập 10-11 kí tự số!'
            }
        }
        if (name === 'passWord') {
            if (!regexPassword.test(value)) {
                messageError = 'Mật khẩu chứa ít nhất 6 kí tự, trong đó phải có 1 chữ và 1 số!'
            }
        }
        if (name === 'confirmPassword') {
            if (value != values.passWord) {
                messageError = 'Mật khẩu không trùng khớp!'
            }
        }

        let newErrors = { ...errors }
        newErrors[name] = messageError
        setState({ values: newValues, errors: newErrors })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        for (let item in state.values) {
            if (state.values[item] == '') {
                dispatch({ type: MESSAGE_APPEAR, payload: <p>Vui lòng điền đủ thông tin!</p> })
            }
        }
        for (let item in state.errors) {
            if (state.errors[item] != '') {
                dispatch({ type: MESSAGE_APPEAR, payload: <p>Thông tin không hợp lệ!</p> })
            }
        }
        dispatch({ type: SIGN_UP_API, payload: state })
        console.log('state', state)
    }

    return (
        <div className='createUser'>
            <form className='createUser__container'>
                <h2>Create User</h2>
                <div className='createUser__item'>
                    <label>Name</label>
                    <input name='name' onChange={handleChange} />
                    <p style={{ color: 'red' }}>{state.errors.name}</p>
                </div>
                <div className='createUser__item'>
                    <label>Email</label>
                    <input name='email' onChange={handleChange} />
                    <p style={{ color: 'red' }}>{state.errors.email}</p>
                </div>
                <div className='createUser__item'>
                    <label>Password</label>
                    <input name='passWord' type='password' onChange={handleChange} />
                    <p style={{ color: 'red' }}>{state.errors.passWord}</p>
                </div>
                <div className='createUser__item'>
                    <label>Confirm password</label>
                    <input name='confirmPassword' type='password' onChange={handleChange} />
                    <p style={{ color: 'red' }}>{state.errors.confirmPassword}</p>
                </div>
                <div className='createUser__item'>
                    <label>Phone Number</label>
                    <input name='phoneNumber' onChange={handleChange} />
                    <p style={{ color: 'red' }}>{state.errors.phoneNumber}</p>
                </div>
                <div className='createUser__item'>
                    <button onClick={handleSubmit} className='btn_submit' type='submit'>Submit</button>
                    <button onClick={() => dispatch({ type: HIDE_MODAL })} className='btn_cancel'>Cancel</button>
                </div>
            </form>
        </div>
    )
}
