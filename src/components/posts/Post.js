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
    let dateDifferenceSeconds = (new Date().getTime() - new Date(post.created_at).getTime()) / 1000;

    if (dateDifferenceSeconds < 60) {
      return 'just now';
    } else if (dateDifferenceSeconds < 3600) {
      let dateDifferenceMinutes = Math.ceil(dateDifferenceSeconds / 60);
      return dateDifferenceMinutes + " mins ago";
    } else if (dateDifferenceSeconds < 86400) {
      let dateDifferenceHours = Math.ceil(dateDifferenceSeconds / 3600);
      return dateDifferenceHours + " hours ago";
    } else if (dateDifferenceSeconds < 604800) {
      let dateDifferenceDays = Math.ceil(dateDifferenceSeconds / 86400);
      return  dateDifferenceDays + " days ago";
    } else if (dateDifferenceSeconds < 29030400) {
      let dateDifferenceMonths = Math.ceil(dateDifferenceSeconds / 2419200);
      return dateDifferenceMonths + " months ago";
    } else {
      let dateDifferenceYears = Math.ceil(dateDifferenceSeconds / 29030400);
      return dateDifferenceYears + " years ago";
    }
  };

  render() {
    let post;
    this.props.match ? post = this.props.posts.filter(post => post.id === parseInt(this.props.match.params.id))[0] : post = this.props.post;

    let postUpvotes = post.votes ? post.votes.filter(vote => vote.upvote === true).length : 0;
    let postDownvotes = post.votes ? post.votes.filter(vote => vote.downvote === true).length : 0;
    let upvotesDifference = postUpvotes - postDownvotes;
    let postComments = post.comments.length === 1 ? `${post.comments.length}` + ' Comment': `${post.comments.length}` + ' Comments';

    let userUpvote = post.votes ? post.votes.filter(vote => vote.user_id === this.props.user.id && vote.upvote === true)[0] : null;
    let userDownvote = post.votes ? post.votes.filter(vote => vote.user_id === this.props.user.id && vote.downvote === true)[0] : null;

    let editLink = post.user_id === this.props.user.id ? 'Edit' : null;

    return (
      <div class="container-fluid bg-white rounded mt-3 post">
        <div class="row">
          <div class="col-1 rounded vote-buttons text-center">
      
            <button 
              class='mt-2'
              name="upvote"
              onClick={ event => this.handleVote(event, post) }
              aria-pressed={this.props.user && userUpvote ? true : false}
            > 🡅 
            </button>

            <span>{upvotesDifference}</span>
          
            <button 
              name="downvote"
              onClick={ event => this.handleVote(event, post) }
              aria-pressed={ this.props.user && userDownvote ? true : false}
            > 🡇 
            </button>

          </div>

          <div class="col-11 card-body">
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
              </Link> &nbsp;

              <Link to={`/posts/${post.id}/edit`}>
                <span class='text-muted'>{editLink}</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addVote, editPost, deletePost, deleteVote })(Post);
