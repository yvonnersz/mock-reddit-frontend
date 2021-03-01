import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { editPost } from "../../actions/post/editPost";
import { deletePost } from "../../actions/post/deletePost";
import { addVote } from "../../actions/vote/addVote";
import { deleteVote } from "../../actions/vote/deleteVote";

class Post extends React.Component {

  handleVote = (event, post) => {
    let user = this.props.user ? this.props.user.id : null;
    let vote = post.votes.filter(vote => vote.user_id === this.props.user.id && (vote.upvote === true || vote.downvote === true))[0];

    if (vote) {
      let deleteVote = {
        post_id: vote.post_id,
        user_id: user
      };

      this.props.deleteVote(vote);
    } else if (event.target.name === "upvote") {
      let upvotePost = {
        ...post,
        upvote: true,
        downvote: false,
        user_id: this.props.user.id,
      };

      this.props.addVote(upvotePost, post.id);
    } else if (event.target.name === "downvote") {
      let downvotePost = {
        ...post,
        upvote: false,
        downvote: true,
        user_id: this.props.user.id,
      };

      this.props.addVote(downvotePost, post.id);
    }
  };

  // handleDelete = (post) => {
  //   this.props.deletePost(post);
  //   this.props.history.push("/posts");
  // };

  dateFormat = (post) => {
    let date1 = new Date(post.created_at);
    let date2 = new Date();

    let diffDate = date2.getTime() - date1.getTime();
    let diffSecs = diffDate / 1000;

    if (diffSecs < 60) {
      return Math.ceil(diffSecs) + " sec ago";
    } else if (diffSecs / 60 < 60) {
      return Math.ceil(diffSecs / 60) + " mins ago";
    } else if (diffSecs / (60 * 60) < 24) {
      return Math.ceil(diffSecs / (60 * 60)) + " hours ago";
    } else if (diffSecs / (60 * 60 * 24) < 7) {
      return Math.ceil(diffSecs / (60 * 60 * 24)) + " days ago";
    } else if (diffSecs / (60 * 60 * 24 * 7) < 4) {
      return Math.ceil(diffSecs / (60 * 60 * 24 * 7)) + " weeks ago";
    } else if (diffSecs / (60 * 60 * 24 * 7 * 4) < 12) {
      return Math.ceil(diffSecs / (60 * 60 * 24 * 7 * 4)) + " months ago";
    } else {
      return Math.ceil(diffSecs / (60 * 60 * 24 * 7 * 4 * 12)) + " years ago";
    }
  };

  render() {
    let post;
    let id = this.props.match ? this.props.match.params.id : null;
    this.props.match ? post = this.props.posts.filter(post => post.id === parseInt(id))[0] : post = this.props.post;

    let postUpvotes = post.votes ? post.votes.filter(vote => vote.upvote === true).length : 0;
    let postDownvotes = post.votes ? post.votes.filter(vote => vote.downvote === true).length : 0;
    let upvotesDifference = postUpvotes - postDownvotes;

    let postComments = post.comments.length === 1 ? `${post.comments.length}` + ' Comment': `${post.comments.length}` + ' Comments';
    
    return (
      <div class="container-fluid bg-white rounded mt-3">
        <div class="row">
          <div class="col-1 rounded vote-buttons text-center">
      
            <button 
              class='mt-2'
              name="upvote"
              onClick={ event => this.handleVote(event, post) }
              // aria-pressed={this.props.user && post.votes.filter((vote) => vote.user_id === this.props.user.id && vote.upvote === true)[0] ? true : false}
            > 🡅 
            </button>

            <span>{upvotesDifference}</span>
          
            <button 
              name="downvote"
              onClick={ event => this.handleVote(event, post) }
              // aria-pressed={ this.props.user && post.votes.filter((vote) => vote.user_id === this.props.user.id && vote.downvote === true)[0] ? true : false}
            > 🡇 
            </button>

          </div>

          <div class="col-11 card-body post-body">
            <div class="card-header p-1">
              <span class='text-muted'>Posted by u/{post.user.username} {this.dateFormat(post)}</span>
            </div>

            <div class="card-title">
              <span><Link to={`/posts/${post.id}/comments`}>{post.title}</Link></span>
            </div>

            <div class="card-text">
                <p>{post.content}</p>
            </div>

            <div class="card-footer p-1">
              <Link to={`/posts/${post.id}/comments`}>
                <span class='text-muted'>{postComments}</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addVote, editPost, deletePost, deleteVote })(Post);
