import React from 'react';
import {connect} from 'react-redux';

import {addComment} from '../actions/addComment';

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
        this.props.addComment(this.state, this.props.post.id)
        this.setState({
            content: '',
            user: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>

                    <input type='text' value={this.state.content} name='content' onChange={this.handleOnChange} placeholder='Comment' /><br/>

                    <input type='text' value={this.state.user} name='user' onChange={this.handleOnChange} placeholder='Name' /><br/>

                    <input type='submit' />

                </form>
            </div>
        )
    }
}

export default connect(null, {addComment})(CommentInput)