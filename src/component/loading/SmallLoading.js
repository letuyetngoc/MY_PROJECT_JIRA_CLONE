import React from 'react'
import { useSelector } from 'react-redux'

export default function SmallLoading() {
    const { isSmallLoading } = useSelector(state => state.LoadingReducer)
    return (
        isSmallLoading && <div className='smallLoading'>
            <div className='smallLoading__spin'></div>
        </div>
    )
}
