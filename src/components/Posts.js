import React from 'react';

// Could also deconstruct are use ({posts}) but it's personal preference.
const Posts = (props) => {
    return (
        <div>
            {props.posts.map(post => <li key={post.id}>{post.title}</li>)}
        </div>
    )
}

export default Posts