import './css/AdminPanel.css';
import React from 'react';
import { API_URL, request } from './apiConnection.js';
import UserList from './UserList';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import CreateSheets from './CreateSheets';
import UserSheet from './UserSheet';
import SendEmails from './SendEmails';
import ReactToPrint from "react-to-print";



class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: '',
      selectedUser: '',
      showCreateUser: false,
      selectedMenu: 1
    }
    this.showEdit = this.showEdit.bind(this);
    this.getUserList = this.getUserList.bind(this);
    this.clearSelectedUser = this.clearSelectedUser.bind(this);
  }


  componentDidMount() {
    this.getUserList();
  }

  getUserList() {
    fetch(request(`${API_URL}/users`, 'GET'))
      .then(res => res.json())
      .then(users => {
        this.setState({ userList: users });
      }).catch(error => Promise.reject(new Error(error))); //?
  }

  showEdit(user) {
    this.setState({ selectedUser: user })
  }


  showMenu(n) {
    this.setState({ selectedMenu: n });
  }

  clearSelectedUser() {
    this.setState({ selectedUser: '' });
    this.getUserList();
  }

  render() {
    console.log(new Date().getDate() < 10);
    return (
      <div className="AdminPanel" >
        <nav className="menu">
          <ul>
            <li onClick={() => this.setState({ selectedMenu: 1 })} className={this.state.selectedMenu === 1 ? 'active' : ''}>Pracownicy</li>
            <li onClick={() => this.setState({ selectedMenu: 2 })} className={this.state.selectedMenu === 2 ? 'active' : ''}> + Dodaj pracownika</li>
            {(this.props.role === 2 && new Date().getDate() < 10) || this.props.role === 1 ? <CreateSheets /> : ''}
            <SendEmails />
            <li>{this.props.logout}</li>
          </ul>
        </nav>
        {this.state.selectedMenu === 1 ?
          <div className="usersContainer">
            {this.state.userList !== '' ? <UserList selectedUser={this.state.selectedUser} userList={this.state.userList} showEdit={this.showEdit}></UserList> : ''}
            {this.state.selectedUser !== '' ? <UserSheet key={this.state.selectedUser.id} user={this.state.selectedUser} ref={(el) => (this.componentRef = el)} /> : ''}
            {this.state.selectedUser !== '' ? <ReactToPrint trigger={() => <div><button>Drukuj listę</button></div>} content={() => this.componentRef} /> : ''}
            {this.state.selectedUser !== '' && this.state.selectedUser.role !== 1 ? <EditUser myRole={this.props.role} clearSelectedUser={this.clearSelectedUser} selectedUser={this.state.selectedUser} updateSelectedUser={this.getUserList}></EditUser> : ''}
          </div> : ''}

        {this.state.selectedMenu === 2 ? <div className="wrapper"><CreateUser myRole={this.props.role} updateUserList={this.getUserList}></CreateUser></div> : ''}
      </div>
    );
  }
}

export default AdminPanel;
