import React from 'react';
import {connect} from 'react-redux';

import {addComment} from '../../actions/comment/addComment';

class CommentInput extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            user: '',
            upvotes: 0,
            toggle_upvote: false,
            toggle_downvote: false
        }
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault();
        let comment = {...this.state, post_id: this.props.id}
        this.props.addComment(comment, this.props.id)
        this.setState({
            content: '',
            user: ''
        })
    }

    render() {
        return (
            <div class='container-fluid text-center'>
                <div class='row content new-comment'>
                    <div class='col-lg-8 text-left'>
                        <form onSubmit={this.handleOnSubmit}>
                            <input type='text' value={this.state.user} name='user' onChange={this.handleOnChange} placeholder='Name' class="form-control" /><br/>
                            <textarea value={this.state.content} name='content' onChange={this.handleOnChange} placeholder='What are your thoughts?' rows="5" class="form-control" /><br/>
                            <input type='submit' />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {addComment})(CommentInput)