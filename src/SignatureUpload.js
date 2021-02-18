import React from 'react';
import { API_URL} from './apiConnection.js';
const axios = require("axios");

class SignatureUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        formData.append('user', this.props.user);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(`${API_URL}/upload-img`, formData, config)
            .then((response) => {
                console.log(response);
                alert("Podpis wysłany");
            }).catch((error) => {

            });
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <div>
                <img width="150px" height="30px" src={`${API_URL}/${this.props.signature}`} alt="Podpis"></img>
                <form onSubmit={this.onFormSubmit}>
                    <h1>Upload podpisu</h1>
                    <input type="file" name="myImage" onChange={this.onChange} />
                    <button type="submit">Wyślij podpis</button>
                </form>
            </div>
        )
    }
}

export default SignatureUpload;