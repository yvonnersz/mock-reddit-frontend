import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {editComment} from '../../actions/comment/editComment';
import {deleteComment} from '../../actions/comment/deleteComment';

class Comment extends React.Component {
    
    handleVote = (event) => {
        if (event.target.name === 'upvote') {
            let updatedComment = {...this.props.comment, upvotes: this.props.comment.upvotes + 1}
            this.props.editComment(updatedComment, this.props.post)
        } else if (event.target.name === 'downvote') {
            let updatedComment = {...this.props.comment, upvotes: this.props.comment.upvotes - 1}
            this.props.editComment(updatedComment, this.props.post)
        }
    }

    handleDelete = (event) => {
        this.props.deleteComment(this.props.comment)
    }

    dateFormat = (comment) => {
        if (comment) {
            return new Date(comment.created_at).toDateString()
        }

    }

    render() {
        return (
            <div class='container-fluid text-center'>
                <div class='row content'>

                        <div class='comment-upvote'>
                            <button name='upvote' onClick={this.handleVote}>⇧</button><br/> {this.props.comment.upvotes}<br/>
                            <button name='downvote' onClick={this.handleVote}>⇩</button><br/>
                        </div>

                        <div class='col-lg-8 text-left'>
                            <span>{this.props.comment.user} • {this.dateFormat(this.props.comment)}</span>
                            <p>{this.props.comment.content}</p>
                            <span><Link to={`/posts/${this.props.comment.post_id}/comments/${this.props.comment.id}/edit`}>Edit</Link></span> &nbsp;
                            <span onClick={this.handleDelete}><Link>Delete</Link></span> &nbsp;
                        </div>

                </div>
            </div>
        )
    }
}

export default connect (null, {editComment, deleteComment})(Comment)