import React from 'react';
import {connect} from 'react-redux';
import {addComment} from '../actions/addComment';

class CommentInput extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
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
            upvotes: 0
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <input type='text' value={this.state.content} name='content' onChange={this.handleOnChange} />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default connect(null, {addComment})(CommentInput)