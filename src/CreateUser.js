import React from 'react';
import { API_URL, request } from './apiConnection.js';
import UserForm from './UserForm';
import './css/CreateUser.css';


class CreateUser extends React.Component {
    newUser(user) {
        fetch(request(`${API_URL}/createuser`, 'POST', user))
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.success) {
                    alert("Użytkownik utworzony.");
                } else {
                    if (result.msg === "USER EXISTS") alert("Użytkownik o podanym adresie e-mail już istnieje!");
                }


            }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))       
    }


    render() {
        return (
            <UserForm className="createUser" newUser={this.newUser}>
                <button type='submit'>Utwórz użytkownika</button>
            </UserForm>
        );
    }
}



export default CreateUser;