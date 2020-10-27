import React from 'react';
import {connect} from 'react-redux';

import {addPost} from '../../actions/addPost';

class PostInput extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            subreddit: '',
            user: '',
            content: '',
            upvotes: 0
        }
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.addPost(this.state, this.props)
        this.setState({
            title: '',
            subreddit: '',
            user: '',
            content: ''
        })
    }

    render() {
        return (
            <div class='container-fluid text-center'>
                <h2>Create a Post</h2>
                <div class='row content new-post'>
                    <div class='form-group'>
                        <form onSubmit={this.handleOnSubmit}>
                            <input type='text' placeholder='Title' value={this.state.title} name='title' onChange={this.handleOnChange} class="form-control"/><br/>
                            <input type='text' placeholder='Subreddit' value={this.state.subreddit} name='subreddit' onChange={this.handleOnChange} class="form-control"/><br/>
                            <input type='text' placeholder='User' value={this.state.user} name='user' onChange={this.handleOnChange} class="form-control"/><br/>
                            <textarea rows="7" placeholder='Content' value={this.state.content} name='content' onChange={this.handleOnChange} class="form-control"/><br/>
                            <input type='submit' value="Create Post" /><br/>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect(null, {addPost})(PostInput);