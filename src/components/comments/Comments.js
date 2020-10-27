import React from 'react';

import Comment from './Comment';

const Comments = (props) => {

    let postId = parseInt(props.postRouterId)
    let post = props.posts.filter(post => post.id === postId)[0]

    return (
        <div>
            {post ? post.comments.map(comment => <Comment key={comment.id} comment={comment}/>):null}
       </div>
    )
}

export default Comments