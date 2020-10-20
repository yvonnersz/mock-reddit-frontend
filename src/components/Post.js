import React from 'react';

const Post = (props) => {
    
    let post = props.posts[props.match.params.id - 1]

    return (
        <div>
            <h2>{post ? post.title:null}</h2>
            <p>{post ? post.content:null}</p>
            {/* <h2>{props.post.title}</h2>
            <p>{props.post.content}</p> */}
        </div>
    )
}

export default Post