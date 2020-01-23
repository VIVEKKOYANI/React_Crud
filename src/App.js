import React, { Component } from "react";
import "./App.css";
import AddUser from "./component/AddUser";
import ListUser from "./component/ListUser";
import EditUser from "./component/EditUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={ListUser} />
            <Route path="/users" component={ListUser} />
            <Route path="/add-user" component={AddUser} />
            <Route path="/edit-user" component={EditUser} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
