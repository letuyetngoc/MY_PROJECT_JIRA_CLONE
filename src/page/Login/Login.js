import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { history } from '../../App';
import { SIGN_IN_API } from '../../redux/saga/typesSaga/UserTypesSaga';
import { MESSAGE_APPEAR } from '../../redux/types/UserTypes';
// react icon
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';


export default function Login() {

    const { userLogin } = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        values: {
            email: '',
            passWord: ''
        },

    })
    const [isPassword, setIsPassword] = useState(false)
    const [typeInput, setTypeInput] = useState('password')

    const handleSubmit = (e) => {
        e.preventDefault()
        const { values } = state
        if (values.email === '' || values.passWord === '') {
            dispatch({ type: MESSAGE_APPEAR, payload: <p>Vui lòng nhập email và mật khẩu!</p> })
        } else {
            dispatch({ type: SIGN_IN_API, payload: values })
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        const newValues = { ...state.values }
        newValues[name] = value
        setState({
            values: newValues
        })
    }

    const inputPassword = useRef()
    const handleShowPassword = (e) => {
        const { type } = inputPassword.current
        setIsPassword(!isPassword)
        const newType = type === 'password' ? 'text' : 'password'
        setTypeInput(newType)
    }

    return (
        <div className='login'>
            <div className='login__heading'>Login</div>
            <form onSubmit={handleSubmit} className='login__content'>
                <div className='login__content-item'>
                    <label><MdEmail /></label>
                    <input onChange={handleChange} id='email' name='email' placeholder='Email' />
                </div>
                <hr />
                <div className='login__content-item'>
                    <label><RiLockPasswordFill /></label>
                    <input onChange={handleChange} ref={inputPassword} id='passWord' name='passWord' type={typeInput} placeholder='Password' />
                    <div onClick={handleShowPassword} className='eye_password'>
                        {isPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </div>
                </div>
                <hr />
                <div className='login__content-btn'>
                    <button type='submit'>Sign in</button>
                </div>
                <div className='login__content-signup'>
                    <p>Don't have an acount?</p>
                    <button onClick={() => history.push('/register')}>Sign up</button>
                </div>
            </form>
        </div >
    )
}
