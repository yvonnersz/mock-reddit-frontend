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
      radio: ''
    };
    
    this.handlePosts = this.handlePosts.bind(this)
  }

  handleBySort = (event) => {
    this.setState({
      radio: event.target.id
    });
  };

  handlePosts = () => {
    switch (this.state.radio) {
      case 'best':
        const sortPosts = [...this.props.posts].sort((aPost, bPost) => (aPost.votes.filter(vote => vote.upvote === true).length - aPost.votes.filter(vote => vote.downvote === true).length) - (bPost.votes.filter(vote => vote.upvote === true).length - bPost.votes.filter(vote => vote.downvote === true).length)).reverse()
        return sortPosts
      default:
        let posts = this.props.posts
        return posts
    }
  }

  render() {
    return (
      <>
        <div class="card">
          <div class="input-group mb-3 new-post">

            <input type="text" class="form-control rounded" placeholder="Create Post" onClick={() => this.props.history.push('/posts/new')} />

          </div>
        </div>

        <div class='card sort-cards'>
          <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio1" id="best" onClick={this.handleBySort}>Best</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio2">Hot</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio3">New</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio4">Top</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio5">Rising</label>

          </div>
        </div>
        
        {this.handlePosts().map(
          post => <Post key={post.id} post={post} user={this.props.user} posts={this.props.posts} />)}

      </>
    )
  }
}

export default connect(null, { addVote, deleteVote })(Posts);
