import React, { Component } from 'react'

 class Login extends Component {

    login(e){
        e.preventDefault();
        alert('Login');
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form method="post" onSubmit={this.login.bind(this)}>
                    Username <input type="text" name="username" />
                    <br />
                    password <input type="password" name="password"/>
                    <br />
                    <input type="submit" value="Login" />
                </form>
            </div>
        )
    }
}

export default Login;