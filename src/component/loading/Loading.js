import React from 'react'
import { useSelector } from 'react-redux'

export default function Loading() {
    const { isLoading } = useSelector(state => state.LoadingReducer)
    return (
        isLoading && <div className='loading'>
            <div className='loading__spin'></div>
        </div>
    )
}
