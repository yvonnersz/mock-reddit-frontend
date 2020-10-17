import React from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions/addPost'

class PostInput extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            subreddit: '',
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
        this.props.addPost(this.state)
        this.setState({
            title: '',
            subreddit: '',
            content: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <input type='text' placeholder='Title' value={this.state.title} name='title' onChange={this.handleOnChange} /><br/>
                    <input type='text' placeholder='Content' value={this.state.content} name='content' onChange={this.handleOnChange} /><br/>
                    <input type='text' placeholder='Subreddit' value={this.state.subreddit} name='subreddit' onChange={this.handleOnChange} /><br/>
                    <input type='submit' value="Create Post" /><br/>
                </form>
            </div>
        )
    }
}

export default connect(null, {addPost})(PostInput);