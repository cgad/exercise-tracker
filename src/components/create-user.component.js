import React from "react";
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

    // TO DO: submit new user object to backend API to update DB
    console.log(user);

    // clear input field
    this.setState({ username: "" });
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
