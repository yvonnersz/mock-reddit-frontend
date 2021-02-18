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
                            <span>🡅</span>&nbsp; 
                            <span>Votes</span>&nbsp; 
                            <span>🡇</span>&nbsp; 
                            <span><Link to={`/posts/${this.props.comment.post_id}/comments/${this.props.comment.id}/edit`}>Edit</Link></span> &nbsp;
                            <span onClick={this.handleDelete}><Link>Delete</Link></span> &nbsp;                        
                        </div>

            </div>
        )
    }
}

export default connect (null, {editComment, deleteComment})(Comment)