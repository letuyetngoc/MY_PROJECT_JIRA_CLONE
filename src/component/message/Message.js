import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { MESSAGE_DISAPPEAR } from '../../redux/types/UserTypes';
export default function Message() {
    const dispatch = useDispatch()
    const { isMessage, Component } = useSelector(state => state.MessageReducer)
    return (
        isMessage && <div className='message'>
            < div className='message__content' >
                <div onClick={() => dispatch({ type: MESSAGE_DISAPPEAR })} className='message__content-btn'>
                    <AiOutlineClose />
                </div>
                {Component}
            </div >
        </div >
    )
}
