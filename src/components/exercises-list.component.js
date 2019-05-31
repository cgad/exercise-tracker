import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// functional component - no state or lifecycle methods
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    {/* <td>{exercise.location}</td> */}
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link
        to={"/edit/" + props.exercise._id}
        onClick={() => {
          props.editExercise(props.exercise._id);
        }}
      >
        edit
      </Link>{" "}
      |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ExercisesList extends React.Component {
  constructor(props) {
    super(props);
    // if i was using ES5, i would bind methods to 'this' here like...
    // this.deleteExercise = this.deleteExercise.bind(this)
    this.state = {
      exercises: []
    };
  }

  // after component loads to page but before anything shows up on the page
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then(exercises => {
        if (exercises.data.length > 0) {
          this.setState({
            // load from database
            exercises: exercises.data
          }); // no map through data cause we want all of object info not just one field
        }
      })
      .catch(err => console.log(err));
  }

  editExercise = id => {
    axios
      .delete('"http://localhost:5000/exercises/" + id')
      .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(exercise => exercise._id !== id)
    });
  };

  // on click of delete button
  // find by id and delete off db via backend api route and page by filtering through state exercises array
  deleteExercise = id => {
    axios
      .get("http://localhost:5000/exercises/" + id)
      .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(exercise => exercise._id !== id)
    }); // return every element in exercises array and filter out the id that was passed in to delete

    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then(res => console.log(res.data));
  };

  // alt method (functional component) to mapping directly in render
  exerciseList = () => {
    return this.state.exercises.map(exercise => {
      return (
        <Exercise
          exercise={exercise}
          deleteExercise={this.deleteExercise}
          editExercise={this.editExercise}
          key={exercise._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration (in minutes)</th>
              {/* <th>Location</th> */}
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {this.state.exercises.map(exercise => (
              <tr key={exercise._id}>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
                <td>{exercise.duration}</td>
                <td>{exercise.location}</td>
                <td>{exercise.date}</td>
              </tr>
            ))} */}
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    );
  }
}
