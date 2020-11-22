import React from 'react';
import { API_URL, request } from './apiConnection.js';


class CreateSheets extends React.Component {
    constructor(props) {
        super(props);
        this.createSheets = this.createSheets.bind(this);
    }

    createSheets() {
        console.log("hehe");
        fetch(request(`${API_URL}/createsheets`, 'POST', { month: 11 }))
            .then(res => res.json())
            .then(result => {
                if (result.success) alert("Listy utworzone");
            }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))       

    }


    render() {
        return (
            <div><button onClick={this.createSheets}>Stwórz listy</button></div>
        );
    }
}



export default CreateSheets;