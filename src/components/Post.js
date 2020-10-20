import React from 'react';
import {Redirect} from 'react-router-dom';

const Post = (props) => {

    let post = props.posts[props.match.params.id - 1]

    return (
        <div>
            <h2>{post ? post.title:null}</h2>
            <p>{post ? post.content:null}</p>
        </div>
    )
}

export default Post