import React from 'react';
import './css/UserSheet.css';
import Summary from './Summary';
import { getUserSheet, MONTH_LIST } from './SheetUtils'

class UserSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sheet: '',
            grouped: '',
            selectedMonth: new Date().getMonth() + 1,
        }
        this.handleMonthSelection = this.handleMonthSelection.bind(this);
    }

    componentDidMount() {
        this.updateSheet();
    }


    updateSheet(month) {
        const user = {
            id: this.props.user.id,
            month: month || this.state.selectedMonth
        }
        getUserSheet(user).then(result => {
            console.log(result);
            this.setState({ grouped: result.grouped, sheet: result.sheet, selectedMonth: user.month, summary: result.summary });
        });
    }

    renderSheet() {
        if (this.state.sheet !== '') {
            return this.state.sheet.map((record, index) => {
                const start = new Date(record.start);
                const finish = new Date(record.finish);
                const startTime = start.getHours() + ':' + (start.getMinutes() < 10 ? '0' : '') + start.getMinutes();
                const finishTime = finish.getHours() + ':' + (finish.getMinutes() < 10 ? '0' : '') + finish.getMinutes();

                const dateDMY = new Date(`${new Date().getFullYear()}-${record.month}-${record.day}`);
                const isWeekend = dateDMY.getDay() === 6 || dateDMY.getDay() === 0;
                const isPublicHoliday = record.ispublicholiday;
                return <tr className={(isWeekend ? "weekend " : "") + (isPublicHoliday ? "ph " : "")} key={index}><td>{record.day}</td><td>{record.start === null ? '-' : startTime}</td><td>{record.finish === null ? '-' : finishTime}</td></tr>
            });
        }
    }

    renderMonths() {
        return MONTH_LIST.map((month, index) => {
            return <option key={index + 1} value={index + 1}>{month}</option>
        });
    }

    handleMonthSelection(e) {
        this.updateSheet(e.target.value);
    }

    render() {
        console.log(this.props.user);
        const sheet = this.renderSheet();
        const renderMonths = this.renderMonths();
        return (
            <div className={"userSheet" + (this.props.user.role === 3 ? " admin" : " user")}>
                <select id="month-selection" onChange={this.handleMonthSelection} value={this.state.selectedMonth}>
                    {renderMonths}
                </select>
                <table>
                    <thead>
                        <tr>
                        </tr>
                        <tr><td>Dzień</td><td>Od</td><td>Do</td></tr>
                    </thead>
                    <tbody>
                        {sheet}
                    </tbody>
                </table>
                {this.state.grouped !== '' ? <Summary user={this.props.user} summary={this.state.summary} data={this.state.grouped}></Summary> : ''}
            </div>
        );
    }
}



export default UserSheet;