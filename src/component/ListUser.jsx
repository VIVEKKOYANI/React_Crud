import React from 'react';

class ListUser extends React.Component{
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render(){
        return(
            <div>
                <h2 className="text-center">User Details</h2>
                <button className="btn btn-danger" style={{width:'100px'}}><a href="/add-user"> Add User</a></button>
            </div>
        )
    }
}

export default ListUser;