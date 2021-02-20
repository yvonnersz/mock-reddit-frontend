import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {editComment} from '../../actions/comment/editComment';
import {deleteComment} from '../../actions/comment/deleteComment';
import {addCommentVote} from '../../actions/vote/addCommentVote';


class Comment extends React.Component {

  handleUpvote = (event, comment) => {
    let vote = {
      upvote: true,
      downvote: false,
      user_id: this.props.user.id,
      post_id: comment.post_id
    }

    this.props.addCommentVote(vote, comment.id)
  }
  

    // handleVote = (event) => {
    //     if (event.target.name === 'upvote') {
    //         if (this.props.comment.toggle_downvote === true) {
    //             let updatedComment = {...this.props.comment, upvotes: this.props.comment.upvotes + 1, toggle_upvote: false, toggle_downvote: false}
    //             this.props.editComment(updatedComment, this.props.post)
    //         } else {
    //             let updatedComment = {...this.props.comment, upvotes: this.props.comment.upvotes + 1, toggle_upvote: true, toggle_downvote: false}
    //             this.props.editComment(updatedComment, this.props.post) // 
    //         }
    //     } else if (event.target.name === 'downvote') {
    //         if (this.props.comment.toggle_upvote === true) {
    //             let updatedComment = {...this.props.comment, upvotes: this.props.comment.upvotes - 1, toggle_upvote: false, toggle_downvote: false}
    //             this.props.editComment(updatedComment, this.props.post)
    //             console.log(updatedComment) //
    //         } else {
    //             let updatedComment = {...this.props.comment, upvotes: this.props.comment.upvotes - 1, toggle_upvote: false, toggle_downvote: true}
    //             this.props.editComment(updatedComment, this.props.post)
    //         }
    //     }
    // }

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
        return (
            <div class='card comment'>

                        <div class='card-header'>
                            <span> {this.props.comment.user.username}• {this.dateFormat(this.props.comment)}</span>
                        </div>

                        {/* <div class='card-body'> */}
                            <div class='card-text'>
                            {this.props.comment.content}

                            </div>

                        {/* </div> */}

                        <div class='card-footer text-muted'>
                            <span onClick={event => this.handleUpvote(event, this.props.comment)}>🡅</span>&nbsp; 
                            <span>{this.props.comment.votes.length}</span>&nbsp; 
                            <span>🡇</span>&nbsp; 
                            {this.props.comment.user_id === this.props.user.id ? <Link to={`/posts/${this.props.comment.post_id}/comments/${this.props.comment.id}/edit`}>Edit</Link> : null}

                            {this.props.comment.user_id === this.props.user.id ? <span onClick={this.handleDelete}><Link>Delete</Link></span> : null}

                                                    
                        </div>

            </div>
        )
    }
}

export default connect (null, {editComment, deleteComment, addCommentVote})(Comment)