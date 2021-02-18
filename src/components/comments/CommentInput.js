import React from 'react';
import {connect} from 'react-redux';

import {addComment} from '../../actions/comment/addComment';

class CommentInput extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            user_id: ''
        }
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleOnSubmit = event => {
        event.preventDefault();
        let idPost = parseInt(this.props.id);
        
        let comment = {...this.state, post_id: idPost, user_id: this.props.user ? this.props.user.id : null}
        this.props.addComment(comment, idPost)
        this.setState({
            content: '',
            user_id: ''
        })
    }

    render() {

        return (
            <div class='card comment-form'>
                {/* <div class='form-control'> */}
                    <div class='mb-3'>
                        <form onSubmit={this.handleOnSubmit}>
                        <label for="exampleFormControlTextarea1" class="form-label">Comment as {this.props.user.username}</label>

                            <textarea value={this.state.content} name='content' onChange={this.handleOnChange} placeholder='What are your thoughts?' rows="5" class="form-control" /><br/>

                            <div class='comment-submit'>
                            <input type='submit' value='Comment'/>

                            </div>
                        </form>
                    </div>
                {/* </div> */}
            </div>
        )
    }
}

export default connect(null, {addComment})(CommentInput)