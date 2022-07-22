import React from 'react'
import { useSelector } from 'react-redux'

export default function AlertMessage({ onOk, onCancle, children }) {

    const { isAlertMessage, Component } = useSelector(state => state.MessageReducer)
    return (
        isAlertMessage && <div className='alertMessage'>
            < div className='alertMessage__content' >
                {children}
                <div className='alertMessage__content-btn'>
                    <button onClick={onOk}>OK</button>
                    <button onClick={onCancle}>Cancel</button>
                </div>
            </div >
        </div >
    )
}
