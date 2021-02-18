import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {editComment} from '../../actions/comment/editComment';
import {deleteComment} from '../../actions/comment/deleteComment';

class Comment extends React.Component {
    
    handleVote = (event) => {
        if (event.target.name === 'upvote') {
            if (this.props.comment.toggle_downvote === true) {
                let updatedComment = {...this.props.comment, upvotes: this.props.comment.upvotes + 1, toggle_upvote: false, toggle_downvote: false}
                this.props.editComment(updatedComment, this.props.post)
            } else {
                let updatedComment = {...this.props.comment, upvotes: this.props.comment.upvotes + 1, toggle_upvote: true, toggle_downvote: false}
                this.props.editComment(updatedComment, this.props.post) // 
            }
        } else if (event.target.name === 'downvote') {
            if (this.props.comment.toggle_upvote === true) {
                let updatedComment = {...this.props.comment, upvotes: this.props.comment.upvotes - 1, toggle_upvote: false, toggle_downvote: false}
                this.props.editComment(updatedComment, this.props.post)
                console.log(updatedComment) //
            } else {
                let updatedComment = {...this.props.comment, upvotes: this.props.comment.upvotes - 1, toggle_upvote: false, toggle_downvote: true}
                this.props.editComment(updatedComment, this.props.post)
            }
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
        console.log(this.props.comment)
        return (
            <div class='container-fluid text-center'>
                <div class='row content'>

                        <div class='comment-upvote'>
                            <button name='upvote' onClick={this.handleVote} disabled={this.props.comment.toggle_upvote === true ? 'true':''}>⇧</button><br/> {this.props.comment.upvotes}<br/>
                            <button name='downvote' onClick={this.handleVote} disabled={this.props.comment.toggle_downvote === true ? 'true':''}>⇩</button><br/>
                        </div>

                        <div class='col-lg-8 text-left'>
                            <span> {this.props.comment.user.username}• {this.dateFormat(this.props.comment)}</span>
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