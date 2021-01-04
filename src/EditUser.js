import React from 'react';
import { API_URL, request } from './apiConnection.js';
import UserForm from './UserForm';
import './css/EditUser.css';



class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.userToEdit = this.userToEdit.bind(this);
    }

    userToEdit(user) {
        if (user.password !== undefined) {
            const passwordReset = window.confirm("Do you really want to reset password for this user?");
            if (!passwordReset) return;
        }

        fetch(request(`${API_URL}/edituser`, 'POST', user))
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    this.props.updateSelectedUser();
                    alert("Dane użytkownika zaktualizowane.");
                }
            }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))       
    }


    render() {
        return (
            <UserForm className="editUser" key={this.props.selectedUser.id} userToEdit={this.userToEdit} userData={this.props.selectedUser}>
                <button type='submit'>Edytuj</button>
            </UserForm>
        );
    }
}



export default EditUser;