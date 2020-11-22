import './css/AdminPanel.css';
import React from 'react';
import { API_URL, request } from './apiConnection.js';
import UserList from './UserList';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import CreateSheets from './CreateSheets';
import UserSheet from './UserSheet';



class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: '',
      selectedUser: '',
      showCreateUser: false
    }
    this.showEdit = this.showEdit.bind(this);
    this.updateSelectedUser = this.updateSelectedUser.bind(this);
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

  updateSelectedUser() {
    this.getUserList();
  }


  createSheetsGivenMonth(month) {

  }



  render() {
    console.log(this.state.selectedUser);
    return (
      <div className="AdminPanel" >
        {this.state.userList !== '' ? <UserList userList={this.state.userList} showEdit={this.showEdit}></UserList> : ''}
        {this.state.selectedUser !== '' ? <EditUser selectedUser={this.state.selectedUser} updateSelectedUser={this.updateSelectedUser}></EditUser> : ''}
        {this.state.selectedUser !== '' ? <UserSheet key={this.state.selectedUser.id} user={this.state.selectedUser} /> : ''}
        <div className="container">
          {this.state.showCreateUser ? <CreateUser></CreateUser> : <button onClick={() => this.setState({ showCreateUser: !this.state.showCreateUser })}>Utwórz użytkownika</button>}
          <CreateSheets />
        </div>
      </div>
    );
  }
}

export default AdminPanel;
