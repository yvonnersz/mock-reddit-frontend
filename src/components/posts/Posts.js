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

  setData() {
    sessionStorage.setItem('posts', JSON.stringify(this.props.posts))
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

  handleBySort = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    });
  };

  render() {
    this.setData();

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
        
        {/* <button onClick={this.handleBySort}>Sort by Votes</button> */}

        {(this.state.best === false ? this.props.posts : sortPosts).map(
          post => <Post key={post.id} post={post} user={this.props.user} posts={this.props.posts} />)}
           </div>
    )
  }
}

export default connect(null, { addVote, deleteVote })(Posts);
