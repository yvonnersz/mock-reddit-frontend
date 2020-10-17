import React from 'react';
import Post from './Post';

// Could also deconstruct are use ({posts}) but it's personal preference.
const Posts = (props) => {
    return (
        <div>
            {props.posts.map(post => <Post post={post}/>)}
        </div>
    )
}

export default Posts