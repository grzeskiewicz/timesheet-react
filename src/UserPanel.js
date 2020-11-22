import './css/UserPanel.css';
import React from 'react';
import DayRecord from './DayRecord';
import Summary from './Summary';
import { getUserSheet } from './SheetUtils'

const MONTH_LIST = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

class UserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sheet: '',
      grouped: ''
    }
    this.renderSheet = this.renderSheet.bind(this);
    this.updateSheet = this.updateSheet.bind(this);
  }
  componentDidMount() {
    this.updateSheet();
  }

  updateSheet() {
    const month = new Date().getMonth() + 1;
    const user = {
      id: this.props.user,
      month: month
    }
    getUserSheet(user).then(result => {
      this.setState(result);
    });
  }


  renderSheet(sheet) {
    if (sheet !== '') {
      return sheet.map((record, index) => {
        return <DayRecord updateSheet={this.updateSheet} record={record} key={index}></DayRecord>
      });
    }
  }






  render() {
    const month = new Date().getMonth();
    const sheet = this.renderSheet(this.state.sheet);
    return (
      <div className="UserPanel" >
        <table>
          <thead>
            <tr>{MONTH_LIST[month]}</tr>
            <tr><td>Dzień</td><td>Od</td><td>Do</td><td>Akceptuj</td><td>Status</td></tr>
            </thead>
          <tbody>
            {sheet}
          </tbody>
        </table>
        <Summary data={this.state.grouped}></Summary>
      </div>
    );
  }
}

export default UserPanel;
