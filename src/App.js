import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/navbar.component.js'
import ExercisesList from './components/exercises-list.component' 
import EditExercise from './components/edit-exercise.component'
import CreateExercise from './components/create-exercise.component'
import CreateUser from './components/create-user.component'

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br />
        <Route path="/" exact component={ExercisesList} />
        {/* :id param corresponds to object ID auto created by mongo with each new document */}
        <Route path="/edit/:id" exact component={EditExercise} />
        <Route path="/log" exact component={CreateExercise} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
