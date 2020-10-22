import React from 'react';

import Comment from './Comment';

const Comments = (props) => {
    return (
        <div>
            <h3>Comments</h3>
            {props.posts && props.posts.map(comment => <Comment key={comment.id} comment={comment} />)}
        </div>
    )    
}

export default Comments