import React from 'react';
import TimePicker from 'react-time-picker';
import { API_URL, request } from './apiConnection.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';



class DayRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStart: this.props.record.start === null ? null : new Date(this.props.record.start),
      timeFinish: this.props.record.finish === null ? null : new Date(this.props.record.finish),
      disabled: true,
      status: ''
    }
    this.changeTimeStart = this.changeTimeStart.bind(this);
    this.changeTimeFinish = this.changeTimeFinish.bind(this);
    this.setHours = this.setHours.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {

  }
  sendTime(e) {
    console.log(e.key)
  }

  changeTimeStart(time) {
    this.setState({ timeStart: time });
  }

  changeTimeFinish(time) {
    this.setState({ timeFinish: time })
  }

  setHours() { // TODO: moveup
    const record = this.props.record;
    const date = `${new Date().getFullYear()}-${record.month}-${record.day}`;

    const timeStart = this.state.timeStart === null ? null : `${date} ${this.state.timeStart}`;
    const timeFinish = this.state.timeFinish === null ? null : `${date} ${this.state.timeFinish}`;

    const sickOrHoliday = Number(this.state.status) === 4 || Number(this.state.status) === 5;
    const toUpdate = {
      id: this.props.record.id,
      start: sickOrHoliday ? null : timeStart,
      finish: sickOrHoliday ? null : timeFinish,
      status: sickOrHoliday ? this.state.status : null
    }

    if (!sickOrHoliday && (timeFinish === null || timeStart === null)) {
      this.setState({ disabled: true });
      return;
    }
    
    fetch(request(`${API_URL}/sethours`, 'POST', toUpdate))
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          this.props.updateSheet();
          this.setState({ disabled: true });

        }
      }).catch(error => Promise.reject(new Error(error)));
  }

  handleStatusChange(e) {
    this.setState({ status: e.target.value });
  }

  render() {
    console.log(this.state.status);
    const record = this.props.record;
    const date = new Date(`${new Date().getFullYear()}-${record.month}-${record.day}`);
    const isWeekend = date.getDay() === 6 || date.getDay() === 0;
    const isPublicHoliday = record.ispublicholiday;
    return (
      <tr className={"DayRecord " + (isWeekend ? "weekend " : "") + (isPublicHoliday ? "ph " : "") + (!this.state.disabled ? "selected" : "")}>
        <td>{record.day}</td>
        <td><TimePicker disabled={this.state.disabled} disableClock={true} clearIcon={null} format="HH:mm" value={this.state.timeStart} onChange={this.changeTimeStart}></TimePicker></td>
        <td><TimePicker disabled={this.state.disabled} disableClock={true} clearIcon={null} format="HH:mm" value={this.state.timeFinish} onChange={this.changeTimeFinish}></TimePicker></td>
        <td>{!this.state.disabled ?
          <select onChange={this.handleStatusChange} value={this.state.status}>
            <option key={3} value={10}>Urlop / Chorobowe?</option>
            <option key={4} value={4}>Urlop</option>
            <option key={5} value={5}>Chorobowe</option>
          </select>
          : record.state}</td>
        <td>{!this.state.disabled ? <FontAwesomeIcon onClick={this.setHours} icon={faCheckCircle} size="lg" /> : <FontAwesomeIcon icon={faEdit} size="lg" onClick={() => this.setState({ disabled: !this.state.disabled })} />}</td>
      </tr>
    );
  }
}

export default DayRecord;
