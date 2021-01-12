import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import { Login, Logout } from './UserAuth';
import reportWebVitals from './reportWebVitals';
import AdminPanel from './AdminPanel';
import UserPanel from './UserPanel';
import { authServices } from './Services';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', id: '', role: '', authorised: false }

    this.authorised = this.authorised.bind(this);
    this.notAuthorised = this.notAuthorised.bind(this);
    this.logout = this.logout.bind(this);
  }


  componentDidMount() {
    authServices.loadUserCredentials();
    authServices.getInfo().then(res => {
      res.success ? this.authorised(res.email, res.role, res.id) : this.notAuthorised();
    });
  }

  authorised(email, role, id) {
    console.log(email, role, id);
    this.setState({ authorised: true, role: role, email: email, id: id });
  }

  notAuthorised() {
    this.setState({ authorised: false, email: '', role: '', id: '' }); // anything more?
  }

  logout() {
    this.setState({ email: '', role: '', authorised: false, id: '' });
  }



  render() {
    return (

      <div id="board">
        {!this.state.authorised ?
          <Login authorised={this.authorised} notAuthorised={this.notAuthorised} />
          : ((this.state.role === 1 || this.state.role === 2) ?
            <AdminPanel role={this.state.role} logout={<Logout email={this.state.email} logout={this.logout} />}></AdminPanel> :
            <UserPanel logout={<Logout email={this.state.email} logout={this.logout} />} user={this.state.id}></UserPanel>)}
      </div >
    );
  }

}

ReactDOM.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
