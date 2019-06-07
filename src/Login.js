import React, { Component } from 'react';
import AuthService from './AuthService';
//import { isNullOrUndefined } from 'util';

class Login extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.Auth = new AuthService(`${this.API_URL}/users/login`);

        this.state = {
            username: "",
            password: ""
        };
    }

    loginForm = (e) => {
        e.preventDefault();
        this.setState({
            username: this.refs.username.value,
            password: this.refs.password.value
        },
            () => {
                this.Auth.login(
                    this.state.username,
                    this.state.password
                );
            });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.loginForm}>
                    <h3>Login</h3>
                    <div className="col-4">
                        <label htmlFor="itemText">Username</label>
                        <input className="form-control" ref='username' type='text' placeholder='Type your username' />
                        <label htmlFor="itemText">Password</label>
                        <input className="form-control" ref='password' type='password' placeholder='Type your password' />
                        <button className="btn btn-outline-warning" type='submit'>Login</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default Login;