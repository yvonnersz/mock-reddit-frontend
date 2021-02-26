import React from "react";
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
    let posts = this.props.posts.map(post => post);

    switch (this.state.radio) {
      case 'best':
        posts = posts.sort((a,b) => {
          let aRatioVotes = a.votes.length !== 0 ? (a.votes.filter(vote => vote.upvote === true).length / a.votes.length) : 0;
          let bRatioVotes = b.votes.length !== 0 ? (b.votes.filter(vote => vote.upvote === true).length / b.votes.length) : 0;
          return aRatioVotes - bRatioVotes;
        }).reverse();
        return posts
      case 'hot':
        posts = posts.sort((a,b) => {
          let dateNow = new Date().getTime();
          let aDateCreated = new Date(a.created_at).getTime();
          let bDateCreated = new Date(b.created_at).getTime();
          let aDateDifference = dateNow - aDateCreated;
          let bDateDifference = dateNow - bDateCreated;
          let aHot = a.votes.filter(vote => vote.upvote === true).length / aDateDifference;
          let bHot = b.votes.filter(vote => vote.upvote === true).length / bDateDifference;
          return aHot - bHot
        }).reverse();
        return posts
      case 'new':
        posts = posts.sort((a,b) => a.created_at - b.created_at).reverse();
        return posts
      case 'top':
        posts = posts.sort((a,b) => {
          let aTotalVotes = a.votes.filter(vote => vote.upvote === true).length - a.votes.filter(vote => vote.downvote === true).length;
          let bTotalVotes = b.votes.filter(vote => vote.upvote === true).length - b.votes.filter(vote => vote.downvote === true).length;
          return aTotalVotes - bTotalVotes;
        }).reverse();
        return posts
      case 'rising':
        posts = posts.sort((a,b) => {
          let dateRisingNow = new Date().getTime();
          let aRisingDateCreated = new Date(a.created_at).getTime();
          let bRisingDateCreated = new Date(b.created_at).getTime();
          let aRisingDate = dateRisingNow - aRisingDateCreated;
          let bRisingDate = dateRisingNow - bRisingDateCreated;
          let aRising = (a.votes.filter(vote => vote.upvote === true).length + a.comments.length) / (aRisingDate);
          let bRising = (b.votes.filter(vote => vote.upvote === true).length + b.comments.length) / (bRisingDate);
          return aRising - bRising
        }).reverse();
        return posts
      default:
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
            <label class="btn btn-outline-primary" for="btnradio2" id="hot" onClick={this.handleBySort}>Hot</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio3" id="new" onClick={this.handleBySort}>New</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio4" id="top" onClick={this.handleBySort}>Top</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio5" id="rising" onClick={this.handleBySort}>Rising</label>

          </div>
        </div>
        
        {this.handlePosts().map(post => <Post key={post.id} post={post} user={this.props.user} posts={this.props.posts} />)}
      </>
    )
  }
}

export default connect(null, { addVote, deleteVote })(Posts);
