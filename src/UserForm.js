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

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSurname = this.handleSurname.bind(this);
        this.handleDeal = this.handleDeal.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            email: this.props.userData !== undefined ? this.props.userData.email : '',
            name: this.props.userData !== undefined ? this.props.userData.name : '',
            surname: this.props.userData !== undefined ? this.props.userData.surname : '',
            role: this.props.userData !== undefined ? this.props.userData.role : '',
            deal: this.props.userData !== undefined ? this.props.userData.deal : '',
            deals: '',
            roles: ''
        };
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
        this.setState({ email: event.target.value, error: result ? '' : 'Niepoprawny format e-mail!' }); //error: event.target.value.length > 4 && result ? '': 'Wrong e-mail address!'
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

    submitForm(event) {
        event.preventDefault();
        const user = {
            id: this.props.userData !== undefined ? this.props.userData.id : null,
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            deal: this.state.deal,
            role: this.state.role,
        };
        if (this.state.error) {
            alert('Wrong e-mail format!');
            return;
        }
        if (this.props.newUser !== undefined) this.props.newUser(user);
        if (this.props.userToEdit !== undefined) this.props.userToEdit(user);

        //fetch
    }

    translateRoles(roles) {
        for (const role of roles) {
            role.role = (TRANSLATIONS_ROLES.filter(element => element.eng === role.role))[0].pl;
        }
        if (this.props.userData !== undefined) {
            this.setState({ role: this.props.userData.role });

        } else {
            this.setState({ role: roles[0].id });
        }
        return roles;
    }


    translateDeals(deals) {
        for (const deal of deals) {
            deal.deal = (TRANSLATIONS_DEALS.filter(element => element.eng === deal.deal))[0].pl;
        }
        if (this.props.userData !== undefined) {
            this.setState({ deal: this.props.userData.deal });
        } else {
            this.setState({ deal: deals[0].id });
        }
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
        const isUserEdit = this.props.userData !== undefined;
        return (
            <form className={this.props.className} onSubmit={this.submitForm}>
                <input placeholder='E-mail' value={this.state.email} onChange={this.handleEmail} required></input>
                {!isUserEdit ? <input type="password" placeholder='Hasło' value={this.state.password} onChange={this.handlePassword} required={!isUserEdit}></input> : ''}
                <input placeholder='Imię' value={this.state.name} onChange={this.handleName} required></input>
                <input placeholder='Nazwisko' value={this.state.surname} onChange={this.handleSurname} required></input>
                <select onChange={this.handleRole} value={this.state.role}>
                    {mappedRoles}
                </select>
                <select onChange={this.handleDeal} value={this.state.deal}>
                    {mappedDeals}
                </select>
                {this.props.children}
                {this.state.error !== '' ? <p className="error">{this.state.error}</p> : ''}
            </form>
        );
    }
}



export default UserForm;   