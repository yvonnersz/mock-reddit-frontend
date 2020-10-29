import React from 'react';

import Comment from './Comment';

const Comments = ({posts, postRouterId}) => {

    let postId = parseInt(postRouterId)
    let post = posts.filter(post => post.id === postId)[0]

    return (
        <div>
            {post ? post.comments.map(comment => <Comment key={comment.id} comment={comment} post={post}/>):null}
       </div>
    )
}

export default Comments