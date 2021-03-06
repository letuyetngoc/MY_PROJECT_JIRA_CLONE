import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskDetail from '../../page/TaskDetail/TaskDetail'
import { HIDE_MODAL } from '../../redux/types/PopupModalTypes'

export default function PopupModal() {
    const dispatch = useDispatch()
    const { Component, isModal, size } = useSelector(state => state.PopupModalReducer)
    const modalTag = useRef()

    useEffect(() => {
        window.scrollTo(0, 0)
        window.addEventListener('click', (e) => {
            if (e.target == modalTag.current) {
                dispatch({ type: HIDE_MODAL })
            }
        })
        return () => {
            window.removeEventListener('click', (e) => {
                if (e.target == modalTag.current) {
                    dispatch({ type: HIDE_MODAL })
                }
            }
            )
        }
    }, [])

    return (
        isModal &&
        <>
            <div className='popupModal' ref={modalTag} >
                <div className='popupModal__content'>
                    {Component}
                </div>
            </div>
        </>
    )
}
