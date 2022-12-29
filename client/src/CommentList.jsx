import React from 'react'

const CommentList = ({ comments }) => {

    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            <ul>
                {
                    comments.map(comment => {
                        let content;
                        if(comment.status === 'approved'){
                            content = comment.content;
                        }

                        if(comment.status === 'pending'){
                            content = 'This comment is awaiting moderation!';
                        }

                        if(comment.status === 'rejected'){
                            content = 'This comment is rejected!';
                        }

                        return (
                            <li key={comment?.id}>{content}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CommentList