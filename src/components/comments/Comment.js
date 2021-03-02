import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {editComment} from '../../actions/comment/editComment';
import {deleteComment} from '../../actions/comment/deleteComment';
import {addCommentVote} from '../../actions/vote/addCommentVote';
import {deleteCommentVote} from '../../actions/vote/deleteCommentVote';

class Comment extends React.Component {
  // handleCommentUpvote = (event, comment) => {

  //   let vote = comment.votes ? comment.votes.filter(
  //     (vote) =>
  //       vote.user_id === this.props.user.id &&
  //       (vote.upvote === true || vote.downvote === true)
  //   )[0] : null;

  //   if (vote && (event.target.getAttribute("aria-pressed") === "true" || event.target.getAttribute("aria-pressed") === "false")) {
  //     let deleteVote = {
  //       id: vote.id,
  //       upvote: false,
  //       downvote: true,
  //       user_id: this.props.user.id,
  //       post_id: vote.post_id,
  //       comment_id: vote.comment_id
  //     }
  
  //     this.props.deleteCommentVote(deleteVote)
  //   } else if (event.target.name === 'upvote'){
  //     let vote = {
  //       upvote: true,
  //       downvote: false,
  //       user_id: this.props.user.id,
  //       post_id: comment.post_id
  //     }
  
  //     this.props.addCommentVote(vote, comment.id)
  //   } else if (event.target.name === 'downvote') {
  //     let vote = {
  //       upvote: false,
  //       downvote: true,
  //       user_id: this.props.user.id,
  //       post_id: comment.post_id
  //     }
  
  //     this.props.addCommentVote(vote, comment.id)
  //   }
  //   }
    
  //   handleDelete = (event) => {
  //       this.props.deleteComment(this.props.comment)
  //   }

  dateFormat = comment => {
    let dateDifferenceSeconds = (new Date().getTime() - new Date(comment.created_at).getTime()) / 1000;

    if (dateDifferenceSeconds < 60) {
      return 'just now';
    } else if (dateDifferenceSeconds < 3600) {
      let dateDifferenceMinutes = Math.ceil(dateDifferenceSeconds / 60);
      return dateDifferenceMinutes + " mins ago";
    } else if (dateDifferenceSeconds < 86400) {
      let dateDifferenceHours = Math.ceil(dateDifferenceSeconds / 3600);
      return dateDifferenceHours + " hours ago";
    } else if (dateDifferenceSeconds < 604800) {
      let dateDifferenceDays = Math.ceil(dateDifferenceSeconds / 86400);
      return  dateDifferenceDays + " days ago";
    } else if (dateDifferenceSeconds < 29030400) {
      let dateDifferenceMonths = Math.ceil(dateDifferenceSeconds / 2419200);
      return dateDifferenceMonths + " months ago";
    } else {
      let dateDifferenceYears = Math.ceil(dateDifferenceSeconds / 29030400);
      return dateDifferenceYears + " years ago";
    }
  };

  render() {
    let comment = this.props.comment ? this.props.comment : null;
    let commentUpvotes = comment ? comment.votes.filter(vote => vote.upvote === true).length : 0;
    let commentDownvotes = comment ? comment.votes.filter(vote => vote.downvote === true).length : 0;
    let commentVoteDifference = commentUpvotes - commentDownvotes;
    let userUpvote = comment.votes ? comment.votes.filter(vote => vote.user_id === this.props.user.id && vote.upvote === true) : null;
    let userDownvote = comment.votes ? comment.votes.filter(vote => vote.user_id === this.props.user.id && vote.downvote === true) : null;
    let editLink = this.props.comment.user_id === this.props.user.id ? <Link to={`/posts/${this.props.comment.post_id}/comments/${this.props.comment.id}/edit`}>Edit</Link> : null;

    return (
      <div class='card mt-3 p-1'>
        <div class='card-header'>
            <span> {comment.user.username} </span>
            <span class='text-muted'>{this.dateFormat(comment)}</span>
        </div>

        <div class='card-body comment-body'>
          <div class='card-text'>
            {comment.content}
          </div>
        </div>

        <div class='card-footer text-muted'>

          <button
            name="upvote"
            aria-pressed={ userUpvote > 0 ? true : false }
            onClick={(event) => this.handleCommentUpvote(event, comment)}
          > 🡅
          </button>
                  
          <span> {commentVoteDifference} </span>

          <button
            name="downvote"
            aria-pressed={ userDownvote > 0 ? true : false }
            onClick={(event) => this.handleCommentUpvote(event, comment)}
          > 🡇
          </button>

          {editLink}
          
        </div>
      </div>
    )
  }
}

export default connect (null, { editComment, deleteComment, addCommentVote, deleteCommentVote })(Comment)