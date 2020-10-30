import React from 'react';
import Pluralize from 'react-pluralize';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {editPost} from '../../actions/post/editPost';

class Posts extends React.Component {

    handleVote = (event, post) => {
        if (event.target.name === "upvote") {
            if (post.toggle_downvote === true) {
                let updatePost = {...post, upvotes: post.upvotes + 1, toggle_upvote: false, toggle_downvote: false}
                this.props.editPost(updatePost)
            } else {
                let updatePost = {...post, upvotes: post.upvotes + 1, toggle_upvote: true, toggle_downvote: false}
                this.props.editPost(updatePost)
            }
        } else if (event.target.name === "downvote") {
            if (post.toggle_upvote === true) {
                let updatePost = {...post, upvotes: post.upvotes - 1, toggle_upvote: false, toggle_downvote: false}
                this.props.editPost(updatePost)
            } else {
                let updatePost = {...post, upvotes: post.upvotes - 1, toggle_upvote: false, toggle_downvote: true}
                this.props.editPost(updatePost)
            }
        }
    }

    dateFormat = (post) => {
        if (post) {
            return new Date(post.created_at).toDateString();
        }    
    }

    render() {
        return (
            <div>
                {this.props.posts.map(post => 
                    <div class='container-fluid text-center' key={post.id}>
                        <div class="row content">

                            <div class='upvotes-column'>
                                <button name='upvote' onClick={(event) => this.handleVote(event, post)} disabled={post.toggle_upvote === true ? 'true':''}>⇧</button><br/> {post.upvotes}<br/>
                                <button name='downvote' onClick={(event) => this.handleVote(event, post)} disabled={post.toggle_downvote === true ? 'true':''}>⇩</button><br/>
                            </div>
    
                            <div class='col-lg-8 text-left'>
                                <span>r/{post.subreddit} • Posted by u/{post.user} • {this.dateFormat(post)}</span>
                                <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
                                <p>{post.content}</p>
                                <span><Link to={`/posts/${post.id}/comments`}><Pluralize singular={'Comment'} count={post.comments.length} /></Link></span>
                            </div>
                            
                        </div>
                    </div>
                )}
            </div>
        )
    }
}


export default connect(null, {editPost})(Posts)