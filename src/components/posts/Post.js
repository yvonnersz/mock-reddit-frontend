import React from 'react';
import Pluralize from 'react-pluralize';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {editPost} from '../../actions/post/editPost';
import {deletePost} from '../../actions/post/deletePost';

class Post extends React.Component {
    
    handleVote = (event, post) => {
        if (post && event.target.name === "upvote") {
            let updatePost = {...post, upvotes: post.upvotes + 1}
            this.props.editPost(updatePost)
        } else if (post && event.target.name === "downvote") {
            let updatePost = {...post, upvotes: post.upvotes - 1}
            this.props.editPost(updatePost)
        }
    }

    handleDelete = (post) => {
        this.props.deletePost(post)
        this.props.history.push('/posts')
    }

    dateFormat = (post) => {
        if (post) {
            return new Date(post.created_at).toDateString()
        }
    }

    render() {

        let post = this.props.posts.filter(post => post.id === parseInt(this.props.match.params.id))[0]

        return (
            <div class='container-fluid text-center'>
                <div class='row content'>

                    <div class='upvotes-column'>
                        <button onClick={(event) => this.handleVote(event, post)} name='upvote'>⇧</button><br/> {post ? post.upvotes:null}<br/>
                        <button onClick={(event) => this.handleVote(event, post)}name='downvote'>⇩</button><br/>
                    </div>

                    <div class='col-lg-8 text-left'>
                        <span>r/{post ? post.subreddit:null} • u/{post ? post.user:null} • {this.dateFormat(post)}</span><br/>
                        <h3>{post ? post.title:null}</h3>
                        <p>{post ? post.content:null}</p>
                        <span><Link to={`/posts/${post ? post.id:null}/comments/`}><Pluralize singular={'Comment'} count={post ? post.comments.length:null} /></Link></span> &nbsp;
                        <span><Link to={`/posts/${post ? post.id:null}/edit`}>Edit</Link></span> &nbsp;
                        <span onClick={(event) => this.handleDelete(post)}><Link to={`/posts/${post ? post.id:null}`}>Delete</Link></span>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(null, {editPost, deletePost})(Post)