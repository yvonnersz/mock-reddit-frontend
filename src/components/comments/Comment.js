import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {editComment} from '../../actions/comment/editComment';
import {deleteComment} from '../../actions/comment/deleteComment';
import {addCommentVote} from '../../actions/vote/addCommentVote';


class Comment extends React.Component {
  handleCommentUpvote = (event, comment) => {
    if (event.target.name === 'upvote') {
      let vote = {
        upvote: true,
        downvote: false,
        user_id: this.props.user.id,
        post_id: comment.post_id
      }
  
      this.props.addCommentVote(vote, comment.id)
    } else {
      let vote = {
        upvote: false,
        downvote: true,
        user_id: this.props.user.id,
        post_id: comment.post_id
      }
  
      this.props.addCommentVote(vote, comment.id)
    }

  }

    handleDelete = (event) => {
        this.props.deleteComment(this.props.comment)
    }

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
      let vote = this.props.comment.votes.filter(vote => vote.user_id === this.props.user.id && vote.upvote === true)

        return (
            <div class='card comment'>

                        <div class='card-header'>
                            <span> {this.props.comment.user.username}• {this.dateFormat(this.props.comment)}</span>
                        </div>

                        <div class='card-text'>
                          {this.props.comment.content}
                        </div>


                        <div class='card-footer text-muted'>
                            <button
                              aria-pressed={vote ? true : false}
                              name="upvote"
                              onClick={(event) => this.handleCommentUpvote(event, this.props.comment)}
                            >
                              🡅
                            </button>
                            
                            <span>{this.props.comment.votes ? this.props.comment.votes.filter((vote) => vote.upvote === true).length - this.props.comment.votes.filter((vote) => vote.downvote === true).length : 0}</span>&nbsp; 

                            <button
                              aria-pressed='false'
                              name="upvote"
                              onClick={(event) => this.handleCommentUpvote(event, this.props.comment)}
                            >
                              🡇
                            </button>

                            
                            {this.props.comment.user_id === this.props.user.id ? <Link to={`/posts/${this.props.comment.post_id}/comments/${this.props.comment.id}/edit`}>Edit</Link> : null}

                            {this.props.comment.user_id === this.props.user.id ? <span onClick={this.handleDelete}><Link>Delete</Link></span> : null}

                                                    
                        </div>

            </div>
        )
    }
}

export default connect (null, {editComment, deleteComment, addCommentVote})(Comment)