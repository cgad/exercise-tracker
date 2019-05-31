import React from "react";
import axios from "axios"; // HTTP requests to backend
import { Form, Button } from "react-bootstrap";

export default class CreateUser extends React.Component {
  constructor(props) {
    // call super when defining constructor of a subclass
    super(props);
    // set state (class's variables)
    this.state = {
      username: ""
    };
  }

  onUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  onSubmit = event => {
    // prevent normal submit behavior like page reload
    event.preventDefault();

    const user = {
      username: this.state.username
    };

    // send new user object to backend server
    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    // redirect to log exercise page
    window.location = "/log";
  };

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="createUserForm.username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Jane Doe"
              value={this.state.username}
              onChange={this.onUsernameChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create User
          </Button>
        </Form>
      </div>
    );
  }
}
