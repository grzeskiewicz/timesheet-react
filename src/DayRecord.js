import React from 'react';
import TimePicker from 'react-time-picker';
import { API_URL, request } from './apiConnection.js';



class DayRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStart: this.props.record.start === null ? '' : new Date(this.props.record.start),
      timeFinish: this.props.record.finish === null ? '' : new Date(this.props.record.finish),
      disabled: true
    }
    this.changeTimeStart = this.changeTimeStart.bind(this);
    this.changeTimeFinish = this.changeTimeFinish.bind(this);
    this.setHours = this.setHours.bind(this);
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

    const timeStart = `${date} ${this.state.timeStart}`;
    const timeFinish = `${date} ${this.state.timeFinish}`;

    const hours = {
      id: this.props.record.id,
      start: timeStart,
      finish: timeFinish
    }
    fetch(request(`${API_URL}/sethours`, 'POST', hours))
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          this.props.updateSheet();
          this.setState({ disabled: true });

        }
      }).catch(error => Promise.reject(new Error(error)));
  }


  render() {
    const record = this.props.record;
    const date = new Date(`${new Date().getFullYear()}-${record.month}-${record.day}`);
    const isWeekend = date.getDay() === 6 || date.getDay() === 0;
    const isPublicHoliday = record.ispublicholiday;
    return (
      <tr className={"DayRecord " + (isWeekend ? "weekend " : "") + (isPublicHoliday ? "ph " : "")+ (!this.state.disabled? "selected":"")}>
        <td onClick={() => this.setState({ disabled: !this.state.disabled })}>{record.day}</td>
        <td><TimePicker disabled={this.state.disabled} disableClock={true} clearIcon={null} format="HH:mm" value={this.state.timeStart} onChange={this.changeTimeStart}></TimePicker></td>
        <td><TimePicker disabled={this.state.disabled} disableClock={true} clearIcon={null} format="HH:mm" value={this.state.timeFinish} onChange={this.changeTimeFinish}></TimePicker></td>
        <td>{!this.state.disabled ? <button onClick={this.setHours}>Akceptuj</button> : ''}</td>
        <td>{record.state}</td>
      </tr>
    );
  }
}

export default DayRecord;
