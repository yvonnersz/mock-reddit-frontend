import React from "react";
import Pluralize from "react-pluralize";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addVote } from "../../actions/vote/addVote";

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      sort: false,
    };
  }

  handleVote = (event, post) => {

    let upvotePost = {
      ...post,
      upvote: true,
      downvote: false
    }

    this.props.addVote(upvotePost, post.id)

    
    // if (event.target.name === "upvote") {
    //   if (post.toggle_downvote === true) {
    //     let updatePost = {
    //       ...post,
    //       upvotes: post.upvotes + 1,
    //       toggle_upvote: false,
    //       toggle_downvote: false,
    //     };
    //     this.props.editPost(updatePost);
    //   } else {
    //     let updatePost = {
    //       ...post,
    //       upvotes: post.upvotes + 1,
    //       toggle_upvote: true,
    //       toggle_downvote: false,
    //     };
    //     this.props.editPost(updatePost);
    //   }
    // } else if (event.target.name === "downvote") {
    //   if (post.toggle_upvote === true) {
    //     let updatePost = {
    //       ...post,
    //       upvotes: post.upvotes - 1,
    //       toggle_upvote: false,
    //       toggle_downvote: false,
    //     };
    //     this.props.editPost(updatePost);
    //   } else {
    //     let updatePost = {
    //       ...post,
    //       upvotes: post.upvotes - 1,
    //       toggle_upvote: false,
    //       toggle_downvote: true,
    //     };
    //     this.props.editPost(updatePost);
    //   }
    // }
  };

  dateFormat = (post) => {
    if (post) {
      return new Date(post.created_at).toDateString();
    }
  };

  handleBySort = () => {
    this.setState({
      sort: !this.state.sort,
    });
  };

  render() {
    const sortPosts = [...this.props.posts]
      .sort((a, b) => a.upvotes - b.upvotes)
      .reverse();

    // if (this.state.sort === false) {
    return (
      <div>
        <div class="card">
          <div class="input-group mb-3 new-post">
            <span class="input-group-text rounded-circle" id="avatar">
              Avatar
            </span>

            <input
              type="text"
              class="form-control rounded"
              placeholder="Create Post"
              onClick={() => this.props.history.push('/posts/new')}
            />
          </div>
        </div>
        
        {/* <button onClick={this.handleBySort}>Sort by Votes</button> */}

        {(this.state.sort === false ? this.props.posts : sortPosts).map(
          (post) => (
            <div class="card" key={post.id}>
              <div class="upvotes-column">
                <div class="upvotes-buttons">
                  <button
                    name="upvote"
                    onClick={(event) => this.handleVote(event, post)}
                    // disabled={post.toggle_upvote === true ? "true" : ""}
                  >
                    ⇧
                  </button>
                  <br />
                  <div class="upvotes">
                    {post.votes ? post.votes.length:0}
                    <br />
                  </div>
                  <button
                    name="downvote"
                    onClick={(event) => this.handleVote(event, post)}
                    // disabled={post.toggle_downvote === true ? "true" : ""}
                  >
                    ⇩
                  </button>
                  <br />
                </div>
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
                    <Pluralize
                      singular={"Comment"}
                      count={post.comments.length}
                    />
                  </Link>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default connect(null, { addVote })(Posts);
