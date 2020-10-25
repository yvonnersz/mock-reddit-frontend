import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Pluralize from 'react-pluralize'
// import { BrowserRouter  } from 'react-router-dom'

import CommentsContainer from '../../containers/CommentsContainer';
import PostEdit from './PostEdit';
import {editVote} from '../../actions/editVote';
import {deletePost} from '../../actions/deletePost';

class Post extends React.Component {
    handleVote = (event) => {
        let post = this.props.posts[this.props.match.params.id - 1] || this.props.posts[0]

        if (event.target.name === "upvote") {
            let updatePost = {...post, upvotes: post.upvotes + 1}
            this.props.editVote(updatePost)
        } else if (event.target.name === "downvote") {
            let updatePost = {...post, upvotes: post.upvotes - 1}
            this.props.editVote(updatePost)
        }
    }

    handleDelete = (event) => {
        let post = this.props.posts[this.props.match.params.id - 1] || this.props.posts[0]
        this.props.deletePost(post)
        this.props.history.push('/posts')
    }

    render() {
        // let post = this.props.posts[this.props.match.params.id - 1]

        // let post = this.props.posts
        let post = this.props.posts.filter(post => post.id === parseInt(this.props.match.params.id))[0]
        // console.log(this.props.match.params.id)
        
        let readableDate = () => {
            if (post) {
                return new Date(post.created_at).toDateString()
            }
        }

        return (
            <div class='container-fluid text-center'>
                <div class='row content'>
                    <div class='upvotes-column'>
                        <button onClick={this.handleVote} name='upvote'>⇧</button><br/>
                        {post ? post.upvotes:null}<br/>
                        <button onClick={this.handleVote}name='downvote'>⇩</button><br/>
                    </div>

                    <div class='col-lg-8 text-left'>
                        <span>r/{post ? post.subreddit:null} • u/{post ? post.user:null} • {post ? readableDate():null}</span><br/>
                        <h3>{post ? post.title:null}</h3>
                        <p>{post ? post.content:null}</p>
                        <span><Link to={`/posts/${post ? post.id:null}/comments/`}><Pluralize singular={'Comment'} count={post ? post.comments.length:null} /></Link></span> &nbsp;
                        <span><Link to={`/posts/${post ? post.id:null}/edit`}>Edit</Link></span> &nbsp;
                        <span onClick={this.handleDelete}><Link to={`/posts/${post ? post.id:null}`}>Delete</Link></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {editVote, deletePost})(Post)