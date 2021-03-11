import React from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { addVote } from '../../actions/vote/addVote';
import { deleteVote } from '../../actions/vote/deleteVote';

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      radio: ''
    };
    
    this.handlePosts = this.handlePosts.bind(this)
  }

  handleBySort = event => {
    this.setState({
      radio: event.target.id
    });
  }

  handlePosts = () => {
    let posts = this.props.posts.map(post => post).sort((a,b) => {

      let aTotalUpvotes = a.votes.filter(vote => vote.upvote === true).length;
      let bTotalUpvotes = b.votes.filter(vote => vote.upvote === true).length;

      let dateNow = new Date().getTime();
      let aDateCreated = new Date(a.created_at).getTime();
      let bDateCreated = new Date(b.created_at).getTime();

      let aDateDifference = dateNow - aDateCreated;
      let bDateDifference = dateNow - bDateCreated;

      switch (this.state.radio) {
        case 'best':
            let aBestAlgorithm = a.votes.length !== 0 ? (aTotalUpvotes / a.votes.length) : 0;
            let bBestAlgorithm = b.votes.length !== 0 ? (bTotalUpvotes / b.votes.length) : 0;
            return aBestAlgorithm - bBestAlgorithm;
        case 'hot':
            let aHotAlgorithm = aTotalUpvotes / aDateDifference;
            let bHotAlgorithm = bTotalUpvotes / bDateDifference;
            return aHotAlgorithm - bHotAlgorithm;
        case 'new':
          return a.created_at - b.created_at;
        case 'top':
            let aTopAlgorithm = aTotalUpvotes - a.votes.filter(vote => vote.downvote === true).length;
            let bTopAlgorithm = bTotalUpvotes - b.votes.filter(vote => vote.downvote === true).length;
            return aTopAlgorithm - bTopAlgorithm;
        case 'rising':
            let aRisingAlgorithm = (aTotalUpvotes + a.comments.length) / aDateDifference;
            let bRisingAlgorithm = (bTotalUpvotes + b.comments.length) / bDateDifference;
            return aRisingAlgorithm - bRisingAlgorithm;
        default:
          return this.props.posts;
      }

    }).reverse();

    return posts;
  }

  render() {
    return (
      <>
        <div class='container-fluid bg-white rounded m-3 p-3 mx-auto'>
          <div class='input-group'>

            <input type='text' class='form-control p-3' id='new-post-input' placeholder='Create Post' onClick={this.props.user ? () => this.props.history.push('/posts/new') : null} 
              data-bs-toggle={!this.props.user ? 'modal' : null}
              data-bs-target={!this.props.user ? '#login-modal' : null}
            />

          </div>
        </div>

        <div class='container-fluid bg-white rounded m-3 p-2 mx-auto'>
          <div class='btn-group w-100' role='sort-selection' aria-label='Radio toggle for Posts'>

            <input type='radio' class='btn-check' name='btnradio' id='btnradio1' autocomplete='off' />
            <label class='btn btn-outline-primary rounded-pill sort-btn' for='btnradio1' id='best' onClick={this.handleBySort}>Best</label>

            <input type='radio' class='btn-check' name='btnradio' id='btnradio2' autocomplete='off' />
            <label class='btn btn-outline-primary rounded-pill sort-btn' for='btnradio2' id='hot' onClick={this.handleBySort}>Hot</label>

            <input type='radio' class='btn-check' name='btnradio' id='btnradio3' autocomplete='off' />
            <label class='btn btn-outline-primary rounded-pill sort-btn' for='btnradio3' id='new' onClick={this.handleBySort}>New</label>

            <input type='radio' class='btn-check' name='btnradio' id='btnradio4' autocomplete='off' />
            <label class='btn btn-outline-primary rounded-pill sort-btn' for='btnradio4' id='top' onClick={this.handleBySort}>Top</label>

            <input type='radio' class='btn-check' name='btnradio' id='btnradio5' autocomplete='off' />
            <label class='btn btn-outline-primary rounded-pill sort-btn' for='btnradio5' id='rising' onClick={this.handleBySort}>Rising</label>

          </div>
        </div>
        
        {this.handlePosts().map(post => <Post key={post.id} post={post} user={this.props.user} posts={this.props.posts} />)}
      </>
    )
  }
}

export default connect(null, { addVote, deleteVote })(Posts);
