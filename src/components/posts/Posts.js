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
      best: false,
      hot: false,
      new: false,
      top: false,
      rising: false
    };
  }

  handleBySort = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    });
  };

  render() {
    const sortPosts = [...this.props.posts].sort((aPost, bPost) => (aPost.votes.filter(vote => vote.upvote === true).length - aPost.votes.filter(vote => vote.downvote === true).length) - (bPost.votes.filter(vote => vote.upvote === true).length - bPost.votes.filter(vote => vote.downvote === true).length)).reverse()

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

          <button type="button" class="btn btn-lg" onClick={this.handleBySort} aria-pressed={this.state.best} name='best'>Best</button>
          <button type="button" class="btn btn-lg" onClick={this.handleBySort} aria-pressed={this.state.hot} name='hot'>Hot</button>
          <button type="button" class="btn btn-lg" onClick={this.handleBySort} aria-pressed={this.state.new} name='new'>New</button>
          <button type="button" class="btn btn-lg" onClick={this.handleBySort} aria-pressed={this.state.top} name='top'>Top</button>
          <button type="button" class="btn btn-lg" onClick={this.handleBySort} aria-pressed={this.state.rising} name='rising'>Rising</button>
          </div>
        </div>
        
        {(this.state.best === false ? this.props.posts : sortPosts).map(
          post => <Post key={post.id} post={post} user={this.props.user} posts={this.props.posts} />)}
           </div>
    )
  }
}

export default connect(null, { addVote, deleteVote })(Posts);
