import React from 'react';
import {connect} from 'react-redux';

import {addComment} from '../../actions/addComment';

class CommentInput extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            user: '',
            upvotes: 0
        }
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault();
        let comment = {...this.state, post_id: this.props.post.id}
        this.props.addComment(comment, this.props.post.id)
        this.setState({
            content: '',
            user: ''
        })
    }

    render() {
        return (
            <div class='container-fluid text-center'>
                <div class='row content'>
                    <div class='col-lg-8 text-left'>
                        <h3>Add a Comment</h3>
                        <form onSubmit={this.handleOnSubmit}>
                            <input type='text' value={this.state.content} name='content' onChange={this.handleOnChange} placeholder='Comment' /><br/>
                            <input type='text' value={this.state.user} name='user' onChange={this.handleOnChange} placeholder='Name' /><br/>
                            <input type='submit' />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {addComment})(CommentInput)