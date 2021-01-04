import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { authServices } from './Services.js';
import './css/UserAuth.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = { email: '', password: '', loginErrorMsg: '' } // , role: '', authorised: false, isAdmin: false 
    }

    handleLogin(event) {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.login(user);
    }

    login(user) {
        authServices.login(user)
            .then(res => {
                if (res.success) {
                    authServices.getInfo().then(res2 => {
                        if (res2.success) {
                            this.props.authorised(res2.email, res2.role, res2.id);
                        } else {
                            this.props.notAuthorised();
                        }
                    })
                } else {
                    this.props.notAuthorised();
                    this.setState({ loginErrorMsg: res.msg });
                }
            });
    }


    handleEmail(event) {
        this.setState({ email: event.target.value });
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div className='login'>
                <form onSubmit={this.handleLogin}>
                    <input name='email' autoFocus placeholder='E-mail' value={this.state.email} onChange={this.handleEmail} required></input>
                    <input type='password' id='password' name='password' placeholder='Hasło' value={this.state.password} onChange={this.handlePassword} required></input>
                    <button type='submit'>Zaloguj</button>
                    <p>Reset hasła</p>
                    <p>{this.state.loginErrorMsg}</p>
                </form>
            </div>
        );
    }
}

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = { showMenu: false };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.toggleMenu, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.toggleMenu, false);
    }

    handleLogout() {
        authServices.logout();
        this.props.logout();
    }

    toggleMenu(event) {
        if (this.node.contains(event.target)) {
            this.setState({ showMenu: true });
        } else {
            this.setState({ showMenu: false });
        }

    }

    render() {
        const email = this.props.email;
        return (
            <div id="userinfo" ref={node => this.node = node}>
                <p>{email}</p>
                <FontAwesomeIcon className="fa" onClick={(event) => this.toggleMenu(event)} icon={faUserCircle} size="2x" />
                {this.state.showMenu ?
                    <div id="user-smallmenu">
                        <button onClick={() => this.handleLogout()}>Wyloguj</button>
                    </div> : ''}
            </div>
        );
    }
}


export { Login, Logout };