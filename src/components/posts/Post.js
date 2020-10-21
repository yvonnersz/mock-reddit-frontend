import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CommentsContainer from '../../containers/CommentsContainer';
import PostEdit from './PostEdit';
import {editVote} from '../../actions/editVote';

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


    render() {
        let post = this.props.posts[this.props.match.params.id - 1] || this.props.posts[0]
        return (
            <div>
                <h2>{post ? post.title:null}</h2>
                <sub>r/{post ? post.subreddit:null}</sub><br/>
                <sub>u/{post ? post.user:null}</sub>
                <p>{post ? post.content:null}</p>
                <span>{post ? post.upvotes : null} </span>
                <button onClick={this.handleVote} name='upvote'>Upvote</button>
                <button onClick={this.handleVote} name='downvote'>Downvote</button>
                <CommentsContainer post={post} />

                {/* Below is the PostEdit Form */}
                {/* <PostEdit post={post}/> */}
            </div>
        )
    }
}

export default connect(null, {editVote})(Post)