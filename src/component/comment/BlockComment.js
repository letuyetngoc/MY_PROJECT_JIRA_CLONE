import React from 'react'
import { memo } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DELETE_COMMENT_API, UPDATE_COMMENT_API } from '../../redux/saga/typesSaga/commentTypes'

function BlockComment({ comment }) {
    const dispatch = useDispatch()

    const [showCommentContent, setShowCommentContent] = useState(true)
    const [showCommentEdit, setShowCommentEdit] = useState(false)

    const [commentEdit, setCommentEdit] = useState(comment.contentComment)

    return (
        <div className='block_comment-sent' >
            <div className='block_comment-avatar'>{comment.user.name.slice(0, 1).toUpperCase()}</div>
            <div className='block_comment-content'>
                <div className='content-heading'>
                    <div>{comment.user.name}</div>
                    <div>{ }</div>
                </div>
                {showCommentContent &&
                    <>
                        <div className='content-body'>
                            {commentEdit}
                        </div>
                        <div className='content-funtion'>
                            <div onClick={() => {
                                setShowCommentContent(false)
                                setShowCommentEdit(true)
                            }}>Edit</div>
                            <div> . </div>
                            <div onClick={() => dispatch({ type: DELETE_COMMENT_API, payload: { id: comment.id, taskId: comment.taskId } })}>Delete</div>
                        </div>
                    </>
                }
                {showCommentEdit && <div className='content-edit'>
                    <textarea value={commentEdit} onChange={(e) => setCommentEdit(e.target.value)} id='textarea_comment_edit' style={{ height: '61px' }}></textarea>
                    <div className='textarea__btn'>
                        <button onClick={(e) => {
                            e.preventDefault()
                            dispatch({ type: UPDATE_COMMENT_API, payload: { id: comment.id, contentComment: commentEdit, taskId: comment.taskId } })
                            setShowCommentEdit(false)
                            setShowCommentContent(true)
                        }}>Save</button>
                        <button onClick={() => {
                            setShowCommentContent(true)
                            setShowCommentEdit(false)
                        }}>Cancel</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default memo(BlockComment)
