import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { authServices } from './Services.js';
import './css/UserAuth.css'
import { BrowserRouter, Switch } from 'react-router-dom'
import NewPassword from './NewPassword';
import GuestRoute from './GuestRoute';
import { API_URL, request } from './apiConnection.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.state = { email: '', password: '', loginErrorMsg: '', emailError: '', resetting:false  } 
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
        const emailPattern = /\w@\w*\.\w/g;
        let result = emailPattern.test(event.target.value);
        if (result === false && event.target.value.length < 6) result = true;
        this.setState({ email: event.target.value, emailError: result ? '' : 'Niepoprawny format e-mail!' }); //poprawic?
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    resetPassword(event) {
        this.setState({resetting:true});
        fetch(request(`${API_URL}/password-reset`, 'POST', { email: this.state.email }))
            .then(res => res.json())
            .then(result => {
                this.setState({resetting:false});
                if (result.success) {
                    alert("Link do resetu hasła wysłany na e-mail użytkownika.");
                }
            }).catch(error => Promise.reject(new Error(error)));
    }

    render() {
        return (
            <div className='login'>
                <form onSubmit={this.handleLogin}>
                    <input name='email' autoFocus placeholder='E-mail' value={this.state.email} onChange={this.handleEmail} required></input>
                    <input type='password' id='password' name='password' placeholder='Hasło' value={this.state.password} onChange={this.handlePassword} required></input>
                    <button type='submit'>Zaloguj</button>
                    {(this.state.emailError === '' && this.state.email.length > 5) ? 
                    (!this.state.resetting ? <p id="password-reset" onClick={this.resetPassword}>Zapomniałem hasła</p> : <p id="password-reset">Wysyłam link...</p>) : ''}
                    <p>{this.state.emailError}</p>
                    <p>{this.state.loginErrorMsg}</p>
                </form>
                <BrowserRouter>
                    <Switch>
                        <GuestRoute exact path="/reset/:userId/:token" component={NewPassword} />
                    </Switch>
                </BrowserRouter>
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