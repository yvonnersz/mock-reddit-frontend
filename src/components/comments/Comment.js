import React from 'react';
import {connect} from 'react-redux';

import {editCommentVote} from '../../actions/editCommentVote';
import {deleteComment} from '../../actions/deleteComment';

class Comment extends React.Component {
    
    handleVote = (event) => {
        let postId = this.props.comment.post_id
        let comment = this.props.comment

        if (event.target.name === 'upvote') {
            let updatedComment = {...comment, upvotes: comment.upvotes + 1}
            this.props.editCommentVote(updatedComment, postId)
        } else if (event.target.name === 'downvote') {
            let updatedComment = {...comment, upvotes: comment.upvotes - 1}
            this.props.editCommentVote(updatedComment, postId)
        }
    }

    handleDelete = (event) => {
        let postId = this.props.comment.post_id
        let commentId = this.props.comment.id
        this.props.deleteComment(commentId, postId)
    }

    render() {
        return (
            <div class='container-fluid text-center'>
                <div class='row content'>
                    {/* <div class='col-lg-8 text-left'> */}
                        <div class='comment-upvote'>
                            <button name='upvote' onClick={this.handleVote}>⇧</button><br/>
                            {this.props.comment.upvotes}<br/>
                            <button name='downvote' onClick={this.handleVote}>⇩</button><br/>
                        </div>

                        <div class='col-lg-8 text-left'>
                            <span>{this.props.comment.user}</span>
                            <p>{this.props.comment.content}</p>
                            <button onClick={this.handleDelete}>Delete</button>
                        </div>
                    {/* </div> */}
            </div>
        </div>
        )
    }
}

export default connect (null, {editCommentVote, deleteComment})(Comment)