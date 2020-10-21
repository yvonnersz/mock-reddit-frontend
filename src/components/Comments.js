import React from 'react';

const Comments = (props) => {
    console.log(props)
    return (
        <div>
            Comments
            {props.posts && props.posts.map(comment => 
                <li key={comment.id}>
                    {comment.content} by {comment.user}
                </li>    
            )}
        </div>
    )    
}

export default Comments