import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";

export default class EditExercise extends React.Component {
  constructor(props) {
    // call super when defining constructor of a subclass
    super(props);
    // set state (class's variables)
    this.state = {
      username: "",
      // name: '',
      description: "",
      duration: 0,
      // location: "",
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
    axios
      .get("http://localhost:5000/exercises/" + this.props.match.params.id) // grab id from url
      .then(exercise => {
        // update state with current values from specific db user
        this.setState({
          username: exercise.data.username,
          description: exercise.data.description,
          duration: exercise.data.duration,
          date: new Date(exercise.data.date) // convert date to Date type
        });
      })
      .catch(err => console.log(err));

    // get usernames for dropdown menu
    axios
      .get("http://localhost:5000/users/")
      .then(res => {
        if (res.data.length > 0) {
          this.setState({ users: res.data.map(user => user.username) });
        }
      })
      .catch(err => console.log(err));
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
      // location: this.state.location,
      date: this.state.date
    };

    axios
      .post(
        "http://localhost:5000/exercises/" + this.props.match.params.id,
        exercise
      )
      .then(res => console.log(res));

    // OPTIONAL
    // redirect to home page (list of exercises)
    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Edit Exercise</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="editExerciseForm.username">
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
              {this.state.username}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="editExerciseForm.description">
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
          <Form.Group controlId="editExerciseForm.duration">
            <Form.Label>Duration (in minutes)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              placeholder="1"
              required
              name="duration"
              value={this.state.duration}
              onChange={this.onInputChange}
            />
          </Form.Group>
          {/* <Form.Group controlId="editExerciseForm.location">
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
          </Form.Group> */}
          <Form.Group controlId="editExerciseForm.date">
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
            Edit Exericse
          </Button>
        </Form>
      </div>
    );
  }
}
