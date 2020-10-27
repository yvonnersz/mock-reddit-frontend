import React from 'react';
import Pluralize from 'react-pluralize';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {editVote} from '../../actions/editVote';

class Posts extends React.Component {

    handleVote = (event, post) => {
        if (event.target.name === "upvote") {
            let updatePost = {...post, upvotes: post.upvotes + 1}
            this.props.editVote(updatePost)
        } else if (event.target.name === "downvote") {
            let updatePost = {...post, upvotes: post.upvotes - 1}
            this.props.editVote(updatePost)
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
                                <button name='upvote' onClick={(event) => this.handleVote(event, post)}>⇧</button><br/> {post.upvotes}<br/>
                                <button name='downvote' onClick={(event) => this.handleVote(event, post)}>⇩</button><br/>
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

export default connect(null, {editVote})(Posts)