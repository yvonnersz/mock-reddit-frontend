import React from 'react';
import Comment from './Comment';

const Comments = ({ user, posts, idPost }) => {
  let post = idPost ? posts.filter(post => post.id === parseInt(idPost))[0] : null;

  return (
    <>
      { post.comments.map(comment => <Comment key={comment.id} user={user} post={post} comment={comment} />) }
    </>
  )
}

export default Comments;