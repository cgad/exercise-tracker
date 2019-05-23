import React from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";

export default class CreateExercise extends React.Component {
  constructor(props) {
    // call super when defining constructor of a subclass
    super(props);
    // set state (class's variables)
    this.state = {
      username: "",
      // name: '',
      description: "",
      duration: 0,
      location: "",
      // equipment: '',
      date: new Date(),
      users: []
    };
  }

  // methods to update state properties
  // using ES6 here but if using ES5 function declarations, have to bind 'this' to each method within the constructor
  // like...
  // this.onInputChange = this.onInputChange.bind(this)

  // before anything is rendered on page
  componentDidMount() {
    this.setState({
      // TO DO: load from database, but for now hardcoded
      users: ["test user"],
      username: "test user"
      // set username so default username on the form is the first user from the dropdown list
    });

    // if no users, redirect to create user page
    // if (this.state.users.length === 0) {
    //   window.location = '/user'
    // }
  }

  // everything but date
  onInputChange = event => {
    const {
      target: { name, value }
    } = event; // name=event.target.name, value=event.target.value
    this.setState({ [name]: value });
  };

  // using date picker library for calendar popup
  onDateChange = date => {
    this.setState({ date: date });
  };

  onSubmit = event => {
    // prevent normal submit behavior like page reload
    event.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      location: this.state.location,
      date: this.state.date
    };

    // TO DO: submit new exercise object to backend API to update DB
    console.log(exercise);

    // redirect to home page (list of exercises)
    // window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Log New Exercise</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="exerciseLogForm.username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              as="select"
              ref="userInput"
              required
              name="username"
              value={this.state.username}
              onChange={this.onInputChange}
            >
              {this.state.users.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exerciseLogForm.description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              required
              rows="3"
              name="description"
              value={this.state.description}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="exerciseLogForm.duration">
            <Form.Label>Duration (in minutes)</Form.Label>
            <Form.Control type="number" min="10" placeholder="1" required />
          </Form.Group>
          <Form.Group controlId="exerciseLogForm.location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              as="select"
              ref="locationInput"
              required
              name="location"
              value={this.state.location}
              onChange={this.onInputChange}
            >
              <option value="gym">Gym</option>
              <option value="home">Home</option>
              <option value="outdoors">Outdoors</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exerciseLogForm.date">
            <Form.Label>Date</Form.Label>
            <br />
            {/* TO DO: restyle datepicker */}
            <DatePicker
              selected={this.state.date}
              onChange={this.onDateChange}
              // className="react-datepicker"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log Exericse
          </Button>
        </Form>
      </div>
    );
  }
}
