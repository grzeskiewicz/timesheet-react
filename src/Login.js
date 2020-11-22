import React from 'react';
import { authServices } from './Services.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = { username: '', password: '', error: '' };
    }
    handleLogin(event) {
        event.preventDefault();
        const user = {
            email: this.state.username,
            password: this.state.password
        };
        authServices.login(user)
            .then(res => {
                if (res.success) {
                    authServices.getInfo().then(res => {
                        if (res.success) {
                            console.log("Zalogowano");
                            this.props.getUserData(user.email);
                        } else {
                            console.log(res);
                            this.setState({ authorised: false, error: "Login error, probably wrong password!" });
                        }
                    })
                } else {
                    console.log(res);

                    this.setState({ authorised: false, error: "Login error, probably wrong password!" });
                }
            });
    }
    handleUsername(event) {
        this.setState({ username: event.target.value });
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }


    render() {
        return (
                <form id="login" onSubmit={this.handleLogin}>
                    <input name='username' placeholder='Your username' value={this.state.username} onChange={this.handleUsername} required></input>
                    <input type='password' id='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handlePassword} required></input>
                    <button type='submit'>Login</button>
                    {this.state.error !== '' ? <p className="error">{this.state.error}</p> : ''}
                </form>
        );
    }
}




export default Login;