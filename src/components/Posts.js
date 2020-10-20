import React from 'react';
import {Route, Link} from 'react-router-dom';

import Post from './Post';

// Could also deconstruct are use ({posts}) but it's personal preference.
const Posts = (props) => {
    return (
        <div>
            {props.posts.map(post => 
                <div key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </div>
            )}
            {/* {props.posts.map(post => <Post post={post}/>)} */}
        </div>
    )
}

export default Posts