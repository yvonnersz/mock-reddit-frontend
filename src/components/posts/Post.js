import React from 'react';
import {Redirect} from 'react-router-dom';

import CommentsContainer from '../../containers/CommentsContainer'

const Post = (props) => {
    console.log(props)

    let post = props.posts[props.match.params.id - 1] || props.match.params.id

    return (
        <div>
            <h2>{post ? post.title:null}</h2>
            <p>{post ? post.content:null}</p>
            <CommentsContainer post={post} />
        </div>
    )
}

export default Post