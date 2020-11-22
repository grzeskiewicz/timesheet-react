import React from 'react';
import { API_URL, request } from './apiConnection.js';

const TRANSLATIONS_ROLES = [
    { eng: "ADMIN", pl: "Admin" },
    { eng: "MANAGER", pl: "Manager" },
    { eng: "EMPLOYEE", pl: "Pracownik" },
]

const TRANSLATIONS_DEALS = [
    { eng: "FULLTIME", pl: "Etat" },
    { eng: "SERVICE", pl: "Serwisant" },
    { eng: "B2B", pl: "B2B" },
    { eng: "CONTRACT", pl: "Umowa zlecenie" },

]

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.newUser = this.newUser.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSurname = this.handleSurname.bind(this);
        this.handleDeal = this.handleDeal.bind(this);
        this.handleRole = this.handleRole.bind(this);

        this.state = { email: '', password: '', name: '', surname: '', role: '', deal: '', deals: '', roles: '' };

    }



    componentDidMount() {
        fetch(request(`${API_URL}/getdeals`, 'GET'))
            .then(res => res.json())
            .then(deals => {
                fetch(request(`${API_URL}/getroles`, 'GET'))
                    .then(res2 => res2.json())
                    .then(roles => {
                        const dealsTranslated = this.translateDeals(deals);
                        const rolesTranslated = this.translateRoles(roles);
                        this.setState({ deals: dealsTranslated, roles: rolesTranslated });
                    });
            }).catch(error => Promise.reject(new Error(error))); //?
    }


    handleEmail(event) {
        const emailPattern = /\w@\w*\.\w/g;
        let result = emailPattern.test(event.target.value);
        if (result === false && event.target.value.length < 6) result = true;
        this.setState({ email: event.target.value, error: result ? '' : 'Wrong e-mail address!' }); //error: event.target.value.length > 4 && result ? '': 'Wrong e-mail address!'
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleName(event) {
        this.setState({ name: event.target.value });
    }
    handleSurname(event) {
        this.setState({ surname: event.target.value });
    }

    newUser(event) {
        event.preventDefault();
        const user = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            deal: this.state.deal,
            role: this.state.role,
        };
        console.log(user);
        fetch(request(`${API_URL}/createuser`, 'POST', user))
            .then(res => res.json())
            .then(result => {
                console.log(result)
            }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))       
    }

    translateRoles(roles) {
        for (const role of roles) {
            role.role = (TRANSLATIONS_ROLES.filter(element => element.eng === role.role))[0].pl;
        }
        this.setState({ role: roles[0].id });
        return roles;
    }


    translateDeals(deals) {
        for (const deal of deals) {
            deal.deal = (TRANSLATIONS_DEALS.filter(element => element.eng === deal.deal))[0].pl;
        }
        this.setState({ deal: deals[0].id });
        return deals;
    }


    renderDealsSelection() {
        return this.state.deals.map((deal, index) => {
            return <option key={index} value={deal.id} id={deal.id}>{deal.deal}</option>
        });
    }

    renderRolesSelection() {
        return this.state.roles.map((role, index) => {
            return <option key={index} value={role.id} id={role.id}>{role.id} - {role.role}</option>
        });
    }

    handleRole(e) {
        console.log(e.target);
        this.setState({ role: e.target.value });

    }

    handleDeal(e) {
        this.setState({ deal: e.target.value });

    }

    render() {
        let mappedDeals;
        let mappedRoles;
        if (this.state.deals !== '') mappedDeals = this.renderDealsSelection();
        if (this.state.roles !== '') mappedRoles = this.renderRolesSelection();
        return (
            <form id="create-user" onSubmit={this.newUser}>
                <input name='email' placeholder='E-mail' value={this.state.email} onChange={this.handleEmail} required></input>
                <input type="password" name='password' placeholder='Password' value={this.state.password} onChange={this.handlePassword} required></input>
                <input name='name' placeholder='Name' value={this.state.name} onChange={this.handleName} required></input>
                <input name='surname' placeholder='Surname' value={this.state.surname} onChange={this.handleSurname} required></input>
                <select id="roles" name="role" onChange={this.handleRole} value={this.state.role}>
                    {mappedRoles}
                </select>
                <select id="deals" name="deal" onChange={this.handleDeal} value={this.state.deal}>
                    {mappedDeals}
                </select>
                <button type='submit'>Sign-up</button>
                {this.state.error !== '' ? <p className="error">{this.state.error}</p> : ''}
            </form>
        );
    }
}



export default CreateUser;