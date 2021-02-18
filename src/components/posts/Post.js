import React from "react";
import Pluralize from "react-pluralize";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { editPost } from "../../actions/post/editPost";
import { deletePost } from "../../actions/post/deletePost";
import { addVote } from "../../actions/vote/addVote";
import { deleteVote } from "../../actions/vote/deleteVote";

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      upvotePress: false,
      upvotePress: false,
    };
  }

  handleVote = (event, post) => {
    let vote = post.votes.filter(
      (vote) =>
        vote.user_id === this.props.user.id &&
        (vote.upvote === true || vote.downvote === true)
    )[0];

    if (
      (vote && event.target.getAttribute("aria-pressed") === "true") ||
      (vote && event.target.getAttribute("aria-pressed") === "false")
    ) {
      let deleteVote = {
        post_id: vote.post_id,
        user_id: this.props.user ? this.props.user.id : null,
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

  handleDelete = (post) => {
    this.props.deletePost(post);
    this.props.history.push("/posts");
  };

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

    if (this.props.match) {
      let id = this.props.match.params.id;
      post = this.props.posts.filter((post) => post.id === parseInt(id))[0];
    } else {
      post = this.props.post;
    }

    return (
      <div class="card post">
        <div class="upvotes-column">
          <div class="upvotes-buttons">
      
              <button
                aria-pressed={
                  this.props.user && post.votes.filter(
                    (vote) =>
                      vote.user_id === this.props.user.id &&
                      vote.upvote === true
                  )[0] 
                    ? true
                    : false
                }
                name="upvote"
                onClick={(event) => this.handleVote(event, post)}
              >
                🡅
              </button>

            <br />

            <div class="upvotes">
              {post.votes
                ? post.votes.filter((vote) => vote.upvote === true).length -
                  post.votes.filter((vote) => vote.downvote === true).length
                : 0}{" "}
              <br />
            </div>

          
            <button
                aria-pressed={
                  this.props.user && post.votes.filter(
                    (vote) =>
                      vote.user_id === this.props.user.id &&
                      vote.downvote === true
                  )[0]
                    ? true
                    : false
                }
                name="downvote"
                onClick={(event) => this.handleVote(event, post)}
              >
                {" "}
                🡇
              </button>

            <br />
          </div>
        </div>

        <div class="card-body">
          <div class="card-header">
            Posted by u/{post.user.username} •
            {this.dateFormat(post)}
          </div>

          <div class="card-title">
            <Link to={`/posts/${post.id}/comments`}>{post.title}</Link>
          </div>

          <div class="card-text">
            <Link to={`/posts/${post.id}`}>
              <p>{post.content}</p>
            </Link>
          </div>

          <div class="card-footer">
            <Link to={`/posts/${post.id}/comments`}>
              <Pluralize singular={"Comment"} count={post.comments.length} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addVote, editPost, deletePost, deleteVote })(
  Post
);
