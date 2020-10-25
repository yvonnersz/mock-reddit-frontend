import React from 'react';
import { connect } from 'react-redux';

import { editPost } from '../../actions/editPost'

class PostInput extends React.Component {
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
        console.log(this.props)
        let post = {...this.state, id: this.props.match.params.id}
        this.props.editPost(post)
        this.setState({
            content: ''
        })
        this.props.history.push(`/posts/${this.props.match.params.id}`)
    }

    render() {
        return (
            <div class='container-fluid text-center'>
                <h2>Edit a Post</h2>
                <div class='row content new-post'>
                    <div class='form-group'>
                        <form onSubmit={this.handleOnSubmit}>
                            <textarea rows='7' placeholder='Content' value={this.state.content} name='content' onChange={this.handleOnChange} class="form-control" /><br/>
                            <input type='submit' value="Edit Post" /><br/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {editPost})(PostInput);