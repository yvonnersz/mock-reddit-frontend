import React from 'react';
import {Route, Link} from 'react-router-dom';
import Pluralize from 'react-pluralize'

import Post from './Post';

// Could also deconstruct are use ({posts}) but it's personal preference.
const Posts = (props) => {
    return (
        <div>
            {props.posts.map(post => 
                <div class='container-fluid text-center' key={post.id}>
                    <div class="row content">
                        <div class='col-lg-8 text-left'>

                            <span>r/{post.subreddit} • Posted by u/{post.user} • {post.created_at}</span>
                            <Link to={`/posts/${post.id}`}>
                                <h3>{post.title}</h3>
                            </Link>
                            <p>{post.content}</p>
                            <span><Pluralize singular={'Comment'} count={post.comments.length} /></span>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Posts