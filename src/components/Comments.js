import React from 'react';

const Comments = (props) => {
    return (
        <div>
            Comments
            {props.posts && props.posts.map(comment => 
                <li key={comment.id}>
                    {comment.content} by PERSON
                </li>    
            )}
        </div>
    )    
}

export default Comments