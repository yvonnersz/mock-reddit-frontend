import React from "react";
import Pluralize from "react-pluralize";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Post from './Post';

import { addVote } from "../../actions/vote/addVote";
import { deleteVote } from "../../actions/vote/deleteVote";

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      sort: false
    };
  }

  handleVote = (event, post) => {
    let vote = post.votes.filter(vote => vote.user_id === this.props.user.id && (vote.upvote === true || vote.downvote === true))[0]

    if (vote && event.target.getAttribute('aria-pressed') === 'true' || vote && event.target.getAttribute('aria-pressed') === 'false') {
      let deleteVote = {
        post_id: vote.post_id,
        user_id: this.props.user ? this.props.user.id : null
      }
      this.props.deleteVote(vote)
    } else if (event.target.name === 'upvote') {
      let upvotePost = {
        ...post,
        upvote: true,
        downvote: false,
        user_id: this.props.user.id
      }
  
      this.props.addVote(upvotePost, post.id)
    } else if (event.target.name === 'downvote') {
      let downvotePost = {
        ...post,
        upvote: false,
        downvote: true,
        user_id: this.props.user.id
      }
  
      this.props.addVote(downvotePost, post.id)
    }
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

        <div class='card sort-cards'>
        <div class="d-grid gap-2 d-md-block">

          <button type="button" class="btn btn-lg" onClick={this.handleBySort}>Best</button>
          <button type="button" class="btn btn-lg" onClick={this.handleBySort}>Hot</button>
          <button type="button" class="btn btn-lg" onClick={this.handleBySort}>New</button>
          <button type="button" class="btn btn-lg" onClick={this.handleBySort}>Top</button>
          <button type="button" class="btn btn-lg" onClick={this.handleBySort}>Rising</button>
          </div>
        </div>
        
        {/* <button onClick={this.handleBySort}>Sort by Votes</button> */}

        {(this.state.sort === false ? this.props.posts : sortPosts).map(
          post => <Post key={post.id} post={post} user={this.props.user} posts={this.props.posts} />)}
           </div>
    )
  }
}

export default connect(null, { addVote, deleteVote })(Posts);
