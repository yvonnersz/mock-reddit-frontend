import React from 'react';

const Comments = (props) => {
    return (
        <div>
            Comments
            {props.posts && props.posts.map(comment => 
                <li key={comment.id}>
                    {comment.content}
                </li>    
            )}
        </div>
    )    
}

export default Comments