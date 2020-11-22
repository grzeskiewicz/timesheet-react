import React from 'react';
import './css/UserSheet.css';

import { getUserSheet } from './SheetUtils'

class UserSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sheet: ''
        }
    }

    componentDidMount() {
        const user = {
            id: this.props.user.id,
            month: 11
        }
        getUserSheet(user).then(result => {
            console.log(result);
            this.setState(result);
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

    render() {
        const sheet = this.renderSheet();
        return (
            <table>
                <thead><tr><td>Dzień</td><td>Od</td><td>Do</td></tr></thead>
                <tbody>
                    {sheet}
                </tbody>
            </table>
        );
    }
}



export default UserSheet;