import React from 'react';

import Comment from './Comment';

const Comments = ({posts, postRouterId, user}) => {

    let postId = parseInt(postRouterId)
    let post = posts.filter(post => post.id === postId)[0]

    return (
        <div>
            {post ? post.comments.map(comment => <Comment key={comment.id} comment={comment} post={post} user={user}/>):null}
       </div>
    )
}

export default Comments