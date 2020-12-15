import React from 'react';
import { API_URL, request } from './apiConnection.js';


class SendEmails extends React.Component {
    constructor(props) {
        super(props);
        this.sendEmails = this.sendEmails.bind(this);
    }

    sendEmails() {
        fetch(request(`${API_URL}/sendemails`, 'GET'))
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    alert("Przypomnienie wysłane!");
                }
            }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))
    }

    render() {
        return (
            <li onClick={this.sendEmails}>Wyślij przypomnienie</li>
        );
    }
}



export default SendEmails;