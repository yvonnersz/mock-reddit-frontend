import React from "react";
import Pluralize from "react-pluralize";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { editPost } from "../../actions/post/editPost";
import { deletePost } from "../../actions/post/deletePost";

class Post extends React.Component {
  handleVote = (event, post) => {
    if (event.target.name === "upvote") {
      if (post.toggle_downvote === true) {
        let updatePost = {
          ...post,
          upvotes: post.upvotes + 1,
          toggle_upvote: false,
          toggle_downvote: false,
        };
        this.props.editPost(updatePost);
      } else {
        let updatePost = {
          ...post,
          upvotes: post.upvotes + 1,
          toggle_upvote: true,
          toggle_downvote: false,
        };
        this.props.editPost(updatePost);
      }
    } else if (event.target.name === "downvote") {
      if (post.toggle_upvote === true) {
        let updatePost = {
          ...post,
          upvotes: post.upvotes - 1,
          toggle_upvote: false,
          toggle_downvote: false,
        };
        this.props.editPost(updatePost);
      } else {
        let updatePost = {
          ...post,
          upvotes: post.upvotes - 1,
          toggle_upvote: false,
          toggle_downvote: true,
        };
        this.props.editPost(updatePost);
      }
    }
  };

  handleDelete = (post) => {
    this.props.deletePost(post);
    this.props.history.push("/posts");
  };

  dateFormat = (post) => {
    if (post) {
      return new Date(post.created_at).toDateString();
    }
  };

  render() {
    let post = this.props.posts.filter(
      (post) => post.id === parseInt(this.props.match.params.id)
    )[0];

    return (
      <div class="card">
        <div class="upvotes-column">
          <button
            name="upvote"
            onClick={(event) => this.handleVote(event, post)}
          >
            ⇧
          </button>
          <br />{" "}
          {post.votes
            ? post.votes.filter((vote) => vote.upvote === true).length -
              post.votes.filter((vote) => vote.downvote === true).length
            : 0}
          <br />
          <button
            name="downvote"
            onClick={(event) => this.handleVote(event, post)}
          >
            ⇩
          </button>
          <br />
        </div>

        <div class="card-body">
          <div class="card-header">
            r/{post.subreddit} • Posted by u/{post.user.username} •
            {this.dateFormat(post)}
          </div>

          <div class="card-title">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
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

export default connect(null, { editPost, deletePost })(Post);
