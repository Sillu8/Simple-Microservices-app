import React from 'react'

const CommentList = ({ comments }) => {

    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            <ul>
                {
                    comments.map(comment => {
                        return (
                            <li key={comment?.id}>{comment?.content}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CommentList