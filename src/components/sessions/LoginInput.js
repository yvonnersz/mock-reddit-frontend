import React from 'react';
import {connect} from 'react-redux';

class LoginInput extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault();
        this.props.addSession(this.state)
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <input type='text' placeholder='Username' name='username' value={this.state.username} onChange={this.handleOnChange} /><br/>
                    <input type='password' placeholder='Password' name='password' value={this.state.password} onChange={this.handleOnChange} /><br/>
                    <input type='submit' value='Log In'/>
                </form>
            </div>
        )
    }
}

export default connect(null)(LoginInput)