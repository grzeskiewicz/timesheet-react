import React from 'react';
import storeNewPassword from './ResetPasswordAction';

class NewPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            errors: ''
        }
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.storeNewPasswordForm = this.storeNewPasswordForm.bind(this);
        
    }



    handleValidation() {//validating password and confirm password
        let password = this.state.password
        let confirmPassword = this.state.confirmPassword
        let errors = {};
        let formIsValid = true;
        console.log("XD123")

        if (!password) {
            formIsValid = false;
            errors["password"] = "Hasło jest wymagane.";
        }
        if (!confirmPassword) {
            formIsValid = false;
            errors["confirmPassword"] = "Wymagane potwierdzenie hasła.";
        }
        if (password && confirmPassword) {
            if (password.length < 4) {
                formIsValid = false;
                errors["password"] = "Hasło powinno mieć min. 5 znaków.";
            } else if (password !== confirmPassword) {
                formIsValid = false;
                errors["password"] = "Hasła nie są takie same.";
            }
        }
        this.setState({ errors: errors })
        return formIsValid;
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleConfirmPassword(event) {
        this.setState({ confirmPassword: event.target.value });
    }

    storeNewPasswordForm(event) {
        event.preventDefault();
        let user = this.props.match.params.userId;
        let resetToken = this.props.match.params.token;


        if (this.handleValidation()) {
            /*  let newPasswordBtnRef = Object.assign({}, this.state.newPasswordBtnRef);
              newPasswordBtnRef.current.disabled = true
              newPasswordBtnRef.current.innerHTML = "Loading..."
              this.setState({ newPasswordBtnRef }); */
            storeNewPassword(this.state.password, user, resetToken).then(res => {  
                console.log(res);
                this.props.history.push('/');

            });

        }
    }


    render() {
        console.log("UDAŁO SIE MORDKO")

        return (
            <div className="passwordResetDiv">
                <form onSubmit={this.storeNewPasswordForm}>
                    <input type='password' name='password' placeholder='Hasło' value={this.state.password} onChange={this.handlePassword} required></input>
                    <input type='password' name='password' placeholder='Powtórz hasło' value={this.state.confirmPassword} onChange={this.handleConfirmPassword} required></input>
                    <button type='submit'>Resetuj</button>
                </form>

            </div>
        );
    }
}



export default NewPassword;