import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CommentsContainer from '../../containers/CommentsContainer';
import PostEdit from './PostEdit';
import {editVote} from '../../actions/editVote';
import {deletePost} from '../../actions/deletePost';

// const Post = (this.props) => {
//     let post = this.props.posts[this.props.match.params.id - 1] || this.props.match.params.id

//     return (
//         <div>
//             <h2>{post ? post.title:null}</h2>
//             <p>{post ? post.content:null}</p>
//             <span>{post ? post.upvotes : null} </span>
//             <button>Upvote</button>
//             <button>Downvote</button>
//             <CommentsContainer post={post} />

//             {/* Below is the PostEdit Form */}
//             {/* <PostEdit post={post}/> */}
//         </div>
//     )
// }

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
    }

    render() {
        let post = this.props.posts[this.props.match.params.id - 1] || this.props.posts[0]
        console.log(post)
        return (
            <div class='container-fluid text-center'>
                <div class='row content'>
                    <div class='upvotes-column'>
                        <button onClick={this.handleVote} name='upvote'>⇧</button><br/>
                        {post ? post.upvotes:null}<br/>
                        <button onClick={this.handleVote}name='downvote'>⇩</button><br/>
                    </div>

                    <div class='col-lg-8 text-left'>
                        <span>r/{post ? post.subreddit:null} • u/{post ? post.user:null} • {post ? post.created_at:null}</span><br/>
                        <h3>{post ? post.title:null}</h3>
                        <p>{post ? post.content:null}</p>
                        <span>{post ? post.comments.length:null} Comments</span>
                    </div>
                </div>
            </div>

            //     <span>{post ? post.upvotes : null} </span>
            //     <button onClick={this.handleVote} name='upvote'>Upvote</button>
            //     <button onClick={this.handleVote} name='downvote'>Downvote</button>
            //     <button onClick={this.handleDelete}>Delete Post</button>
            //     <CommentsContainer post={post} />

            //     {/* Below is the PostEdit Form */}
            //     {/* <PostEdit post={post}/> */}
            // </div>

        )
    }
}

export default connect(null, {editVote, deletePost})(Post)