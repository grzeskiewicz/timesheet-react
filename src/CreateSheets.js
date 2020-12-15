import React from 'react';
import { API_URL, request } from './apiConnection.js';


class CreateSheets extends React.Component {
    constructor(props) {
        super(props);
        this.createSheets = this.createSheets.bind(this);
    }

    createSheets() {
        fetch(request(`${API_URL}/createsheets`, 'POST', { month: new Date().getMonth() + 1 }))
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    fetch(request(`${API_URL}/createsummaries`, 'POST', { updateallusers: true }))
                        .then(res => res.json())
                        .then(result2 => {
                            if (result2.success) alert("Listy na obecny miesiąć utworzone!")
                        }).catch(error => Promise.reject(new Error(error)));
                }
            }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))
    }

    render() {
        return (
            <li onClick={this.createSheets}>Stwórz listy</li>
        );
    }
}



export default CreateSheets;