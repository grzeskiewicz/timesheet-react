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
            selectedYear: new Date().getFullYear()
        }
        this.prevYear = this.prevYear.bind(this);
        this.currentYear = this.currentYear.bind(this);
        this.handleMonthSelection = this.handleMonthSelection.bind(this);
    }

    componentDidMount() {
        this.updateSheet();
    }


    updateSheet(month, year) {
        const user = {
            id: this.props.user.id,
            month: month || this.state.selectedMonth,
            year: year || this.state.selectedYear
        }
        console.log(user);
        getUserSheet(user).then(result => {
            console.log(result);
            this.setState({ grouped: result.grouped, sheet: result.sheet, selectedMonth: user.month, selectedYear: user.year, summary: result.summary });
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
                return <tr className={(isWeekend ? "weekend " : "") + (isPublicHoliday ? "ph " : "")} key={index}><td>{record.day}</td><td>{record.start === null ? '-' : startTime}</td><td>{record.finish === null ? '-' : finishTime}</td><td>{record.state}</td></tr>
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


    prevYear() {
        let year = this.state.selectedYear;
        this.updateSheet(this.state.selectedMonth, --year);
    }

    currentYear() {
        this.updateSheet(new Date().getMonth() + 1, new Date().getFullYear());
    }

    render() {
        const sheet = this.renderSheet();
        const renderMonths = this.renderMonths();
        const year = this.state.selectedYear;
        console.log(this.state.sheet);
        return (
            <div className={"userSheet" + (this.props.user.role === 1 || this.props.user.role === 2 ? " admin" : " user")}>

                <div id="user-year-selection">
                    {year === new Date().getFullYear() ? <span onClick={this.prevYear}>{'<<'}</span> : ''}
                    <p>{year}</p>
                    {year !== new Date().getFullYear() ? <span onClick={this.currentYear}>{'>>'}</span> : ''}
                </div>

                <select id="month-selection" onChange={this.handleMonthSelection} value={this.state.selectedMonth}>
                    {renderMonths}
                </select>
                {this.state.sheet.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                            </tr>
                            <tr><td>Dzień</td><td>Od</td><td>Do</td><td>Status</td></tr>
                        </thead>
                        <tbody>
                            {sheet}
                        </tbody>
                    </table>    
                    : "Brak listy na podany miesiąc."
            }

                { this.state.grouped !== '' && this.state.sheet.length > 0 ? <Summary user={this.props.user} summary={this.state.summary} data={this.state.grouped}></Summary> : ''}
            </div >
        );
    }
}



export default UserSheet;