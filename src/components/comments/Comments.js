import React from 'react';

const Comments = (props) => {
    return (
        <div>
            <h3>Comments</h3>
            {props.posts && props.posts.map(comment => 
                <li key={comment.id}>
                    {comment.content} by {comment.user}
                </li>    
            )}
        </div>
    )    
}

export default Comments