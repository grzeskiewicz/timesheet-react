import React from 'react';
import { API_URL, request } from './apiConnection.js';
import UserForm from './UserForm';
import './css/EditUser.css';



class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.userToEdit = this.userToEdit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
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
                } else {
                    this.props.updateSelectedUser();
                    alert("Użytkownik nie został zaktualizowany - e-mail już istnieje lub brak nowych danych");
                }
            }).catch(error => Promise.reject(new Error(error)));
    }

/*
    blockUser() {
        fetch(request(`${API_URL}/block`, 'POST', { user: this.props.selectedUser.id }))
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    this.props.updateSelectedUser();
                } else {
                    this.props.updateSelectedUser();

                }
            }).catch(error => Promise.reject(new Error(error)));
    } */

    deleteUser() {
        const user = this.props.selectedUser;
        const deleteUser = window.confirm(`Czy na pewno chcesz usunąć ${user.name} ${user.surname} (${user.email}) ?`);
        if (deleteUser) {
            fetch(request(`${API_URL}/delete-user`, 'POST', { user: user.id }))
                .then(res => res.json())
                .then(result => {
                    if (result.success) {
                        //  this.props.updateSelectedUser();
                        this.props.clearSelectedUser();
                        alert("Użytkownik usunięty.")
                    } else {

                    }
                }).catch(error => Promise.reject(new Error(error)));
        }
    }

    render() {
        return (
            <div>
                <UserForm className="editUser" key={this.props.selectedUser.id} userToEdit={this.userToEdit} userData={this.props.selectedUser}>
                    <button type='submit'>Edytuj</button>
                </UserForm>
                <button onClick={this.deleteUser}>Usuń użytkownika</button>
            </div>

        );
    }
}



export default EditUser;