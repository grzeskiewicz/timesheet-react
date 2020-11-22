import React from 'react';
import { API_URL, request } from './apiConnection.js';
import UserForm from './UserForm';


class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.userToEdit = this.userToEdit.bind(this);
    }

    userToEdit(user) {
        console.log(user);
        fetch(request(`${API_URL}/edituser`, 'POST', user))
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    this.props.updateSelectedUser()
                    alert("User updated");
                }
            }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))       
    }


    render() {
        console.log(this.props.selectedUser);
        return (
            <UserForm key={this.props.selectedUser.id} userToEdit={this.userToEdit} userData={this.props.selectedUser}>
                <button type='submit'>Edit user</button>
            </UserForm>
        );
    }
}



export default EditUser;