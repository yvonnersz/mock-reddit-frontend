import React from 'react';
import CommentInput from '../components/comments/CommentInput';
import Comments from '../components/comments/Comments';

const CommentsContainer = props => {
  return (
    <div>
      <CommentInput posts={props.posts} id={props.match.params.id} user={props.user}/>
      <Comments posts={props.posts} idPost={props.match.params.id} user={props.user}/>
    </div>
  )
}

export default CommentsContainer;