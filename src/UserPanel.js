import './css/UserPanel.css';
import React from 'react';
import DayRecord from './DayRecord';
import Summary from './Summary';
import { getUserSheet, MONTH_LIST } from './SheetUtils'


class UserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sheet: '',
      grouped: '',
      selectedMonth: new Date().getMonth() + 1,
      summary: ''
    }
    this.renderSheet = this.renderSheet.bind(this);
    this.updateSheet = this.updateSheet.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.currentMonth = this.currentMonth.bind(this);
  }
  componentDidMount() {
    this.updateSheet();
  }

  updateSheet(month) {
    const user = {
      id: this.props.user,
      month: month || this.state.selectedMonth
    }
    getUserSheet(user).then(result => {
      console.log(result);
      this.setState({ grouped: result.grouped, sheet: result.sheet, selectedMonth: user.month, summary: result.summary });
    });
  }


  prevMonth() {
    let month = this.state.selectedMonth;
    this.updateSheet(--month);
  }

  currentMonth() {
    const month = new Date().getMonth() + 1;
    this.updateSheet(month);
  }


  renderSheet(sheet) {
    if (sheet !== '') {
      return sheet.map((record, index) => {
        return <DayRecord updateSheet={this.updateSheet} record={record} key={index}></DayRecord>
      });
    }
  }





  render() {
    const month = this.state.selectedMonth;
    const sheet = this.renderSheet(this.state.sheet);
    const maxDate = new Date(new Date().setDate(10));
    return (
      <div className="UserPanel">
        <nav className="menu">
          <ul>
            <li>{this.props.logout}</li>
          </ul>
        </nav>
        <div className="container">
          <table>
            <thead>
              <tr id="user-month-selection"><td></td><td>{(month === new Date().getMonth() + 1) && (new Date() < maxDate) ? <span onClick={this.prevMonth}>{'<<'}</span> : ''}</td><td>{MONTH_LIST[month - 1]}</td><td>{month !== new Date().getMonth() + 1 ? <span onClick={this.currentMonth}>{'>>'}</span> : ''}</td><td></td></tr>
              <tr><td>Dzień</td><td>Od</td><td>Do</td><td>Status</td><td></td></tr>
            </thead>
            <tbody>
              {sheet}
            </tbody>
          </table>
          <Summary data={this.state.grouped} user={this.props.user} summary={this.state.summary}></Summary>
        </div>
      </div>
    );
  }
}

export default UserPanel;
