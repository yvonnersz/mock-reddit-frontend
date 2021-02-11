import React from "react";
import Pluralize from "react-pluralize";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addVote } from "../../actions/vote/addVote";

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      sort: false
    };
  }

  handleVote = (event, post) => {
    if (event.target.name === 'upvote') {
      let upvotePost = {
        ...post,
        upvote: true,
        downvote: false,
        user_id: this.props.user.id
      }
  
      this.props.addVote(upvotePost, post.id)
    } else {
      let downvotePost = {
        ...post,
        upvote: false,
        downvote: true,
        user_id: this.props.user.id
      }
  
      this.props.addVote(downvotePost, post.id)
    }


    
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
                  {console.log(post.votes.filter(vote => vote.user_id === this.props.user.id)[0])}

                  <button
                  // aria-pressed={this.state.upvotePress}
                  aria-pressed={post.votes.filter(vote => vote.user_id === this.props.user.id && vote.upvote === true)[0] ? true:false}
                  name="upvote"
                    onClick={(event) => this.handleVote(event, post)}
                  >
                    🡅
                  </button>
                  <br />
                  <div class="upvotes">

                    {post.votes ? post.votes.filter(vote => vote.upvote === true).length - post.votes.filter(vote => vote.downvote === true).length:0}
                    <br />
                  </div>
                  <button
                  aria-pressed={post.votes.filter(vote => vote.user_id === this.props.user.id && vote.downvote === true)[0] ? true:false}
                  name="downvote"
                    onClick={(event) => this.handleVote(event, post)}
                  >
                    🡇
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
