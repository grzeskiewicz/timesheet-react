import React from 'react';
import { API_URL, request } from './apiConnection.js';


class SendEmails extends React.Component {
    constructor(props) {
        super(props);
        this.sendEmails = this.sendEmails.bind(this);
        this.state = {
            loading: false
        }
    }

    sendEmails() {
        this.setState({ loading: true });
        fetch(request(`${API_URL}/sendemails`, 'GET'))
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    this.setState({ loading: false });
                    alert("Przypomnienie wysłane!");
                }
            }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))
    }

    render() {
        return (
            <li disabled={this.state.loading} onClick={this.sendEmails}>{this.state.loading ? "Wysyłanie..." : "Wyślij przypomnienie"}</li>
        );
    }
}



export default SendEmails;