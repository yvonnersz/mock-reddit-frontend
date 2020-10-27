import React from 'react';

import CommentInput from '../components/comments/CommentInput'
import Comments from '../components/comments/Comments'

const CommentsContainer = (props) => {
    return (
        <div>
            <CommentInput posts={props.posts} id={props.match.params.id}/>
            <Comments posts={props.posts} postRouterId={props.match.params.id}/>
        </div>
    )
}

export default CommentsContainer