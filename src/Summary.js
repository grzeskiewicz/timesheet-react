import React from 'react';
import { API_URL, request } from './apiConnection.js';
import './css/Summary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';


class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bonus: this.props.summary.bonus || 0,
            overtime: this.props.summary.overtime || 0,
            showBonusEdit: false,
            showOvertimeEdit: false
        }
        this.handleBonus = this.handleBonus.bind(this);
        this.handleOvertime = this.handleOvertime.bind(this);
        this.updateSummary = this.updateSummary.bind(this);
        this.toggleBonusEdit = this.toggleBonusEdit.bind(this);
        this.toggleOverTimeEdit = this.toggleOverTimeEdit.bind(this);
    }


    renderSummary(data) {
        console.log(data);
        const render = Object.keys(data).map((elem, index) => {
            return <p key={index}><span>{elem}</span><span>{data[elem].length}</span></p>
        })
        return render;
    }

    handleBonus(e) {
        this.setState({ bonus: e.target.value });
    }

    handleOvertime(e) {
        this.setState({ overtime: e.target.value });
    }

    updateSummary(e) {
        e.preventDefault();
        const summary = { id: this.props.summary.id, bonus: this.state.bonus, overtime: this.state.overtime };
        fetch(request(`${API_URL}/setsummary`, 'POST', summary))
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    alert("Lista zaktualizowana!");
                }

            }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))     }
    }


    toggleBonusEdit() {
        this.setState({ showBonusEdit: !this.state.showBonusEdit });
    }

    toggleOverTimeEdit() {
        this.setState({ showOvertimeEdit: !this.state.showOvertimeEdit });

    }
    render() {
        const data = this.props.data;
        const render = this.renderSummary(data);
        return (
            <div className={"Summary " + this.props.className}>
                {render}
                {this.props.user.role === 3 ?
                    <form id="update-summary-form" onSubmit={this.updateSummary}>
                        <div>
                            <label id="bonus">Premia</label>
                            {!this.state.showBonusEdit ?
                                <div className="container">
                                    <p>{this.state.bonus}</p><FontAwesomeIcon icon={faEdit} size="lg" onClick={this.toggleBonusEdit} />
                                </div> :
                                <div className="container">
                                    <input maxLength="4" size="4" type="text" value={this.state.bonus} name="bonus" onChange={this.handleBonus}></input>
                                    <FontAwesomeIcon icon={faCheckSquare} size="lg" onClick={this.toggleBonusEdit} />
                                </div>
                            }
                        </div>
                        <div>
                            <label id="overtime">Nadgodziny</label>
                            {!this.state.showOvertimeEdit ?
                                <div className="container">
                                    <p>{this.state.overtime}</p><FontAwesomeIcon  icon={faEdit} size="lg" onClick={this.toggleOverTimeEdit} />
                                </div> :
                                <div className="container">
                                    <input maxLength="3" size="4" type="text" name="overtime" value={this.state.overtime} onChange={this.handleOvertime}></input>
                                    <FontAwesomeIcon icon={faCheckCircle} size="lg" onClick={this.toggleOverTimeEdit} />
                                </div>
                            }

                        </div>
                        <button id="summary-accept" type="submit">Akceptuj</button>
                    </form> : ''}
            </div>
        );
    }
}

export default Summary;
