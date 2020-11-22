import React from 'react';
import { API_URL, request } from './apiConnection.js';
import UserForm from './UserForm';


class CreateUser extends React.Component {
    newUser(user) {
        console.log(user);
        fetch(request(`${API_URL}/createuser`, 'POST', user))
            .then(res => res.json())
            .then(result => {
                console.log(result)
            }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))       
    }


    render() {
        return (
            <UserForm newUser={this.newUser}>
                <button type='submit'>Utwórz użytkownika</button>
            </UserForm>
        );
    }
}



export default CreateUser;