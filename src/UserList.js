import React from 'react';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }
    selectUser(user) {
       // console.log(user);
        this.props.showEdit(user);
    }

    renderList() {
        return this.props.userList.map((user, index) => <div key={index} onClick={()=>this.selectUser(user)} className="user">{user.name} {user.surname}</div>);
    }



    render() {
        const userList = this.renderList();
        return (
            <div>{userList}</div>
        );
    }
}



export default UserList;