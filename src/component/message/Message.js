import React from 'react'
import { useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { MESSAGE_DISAPPEAR } from '../../redux/types/UserTypes';
export default function Message({ children }) {
    const dispatch = useDispatch()
    return (
        <div className='message'>
            < div className='message__content' >
                <div onClick={() => dispatch({ type: MESSAGE_DISAPPEAR })} className='message__content-btn'>
                    <AiOutlineClose />
                </div>
                {children}
            </div >
        </div >
    )
}
