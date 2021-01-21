import React from 'react';
import axios from 'axios';

class UserInput extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            password_confirmation: ''
        }
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {username, password, password_confirmation} = this.state

        axios.post('http://localhost:3000/users', {
            user: {
                username: username,
                password: password,
                password_confirmation: password_confirmation
            }
        }, 
        {withCredentials: true}
        )

        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text'
                        name='username'
                        placeholder='Enter in a username'
                        onChange={this.handleOnChange}>
                    </input>

                    <input
                        type='password'
                        name='password'
                        placeholder='Enter password'
                        onChange={this.handleOnChange}>
                    </input>

                    <input
                        type='password'
                        name='password_confirmation'
                        placeholder='Enter password'
                        onChange={this.handleOnChange}>
                    </input>

                    <input
                        type='submit'
                        value='Register'>
                    </input>
                </form>
            </div>
        )
    }
}

export default UserInput;