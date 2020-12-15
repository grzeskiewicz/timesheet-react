import React from 'react';
import './css/UserList.css';


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }
    selectUser(user) {
        this.props.showEdit(user);
    }

    renderList() {
        return this.props.userList.map((user, index) => <div key={index} onClick={() => this.selectUser(user)} className={"user" + (this.props.selectedUser.id === user.id ? " active" : "")}><p>{user.name} {user.surname}</p></div>);
    }



    render() {
        const userList = this.renderList();
        return (
            <div className="userList">{userList}</div>
        );
    }
}



export default UserList;