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

export default connect(null, {addComment})(CommentInput)