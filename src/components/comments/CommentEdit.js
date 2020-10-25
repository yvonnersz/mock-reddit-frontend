import React from 'react';
import {connect} from 'react-redux';

import {editComment} from '../../actions/editComment';

class CommentEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
        }
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault();
        let postId = parseInt(this.props.match.params.id)
        let comment = {...this.state, post_id: postId}

        this.props.editComment(comment, postId)
        this.setState({
            content: '',
        })

        this.props.history.push(`/posts/${postId}/comments`)
    }

    render() {
        return (
            <div class='container-fluid text-center'>
                <div class='row content new-comment'>
                    <div class='col-lg-8 text-left'>
                        <form onSubmit={this.handleOnSubmit}>
                            <textarea value={this.state.content} name='content' onChange={this.handleOnChange} placeholder='What are your thoughts?' rows="5" class="form-control" /><br/>
                            <input type='submit' />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {editComment})(CommentEdit)