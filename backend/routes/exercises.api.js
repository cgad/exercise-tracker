// get express router
const router = require("express").Router();

// require Exercise model
const Exercise = require("../models/exercise.model");

// get all exercises
// /exercises/ endpoint
router.route("/").get((req, res) => {
  // get all exercises in DB
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.json("Error: " + err));
});

// add an exercise
// /exercises/add endpoint
router.route("/add").post((req, res) => {
  const {
    username,
    name,
    description,
    duration,
    location,
    equipment,
    date
  } = req.body;

  const newExercise = new Exercise({
    username,
    name,
    description,
    duration,
    location,
    equipment,
    date
  });

  // save new exercise document to DB
  newExercise
    .save()
    .then(() => res.json("Exercise added"))
    .catch(err => res.json("Error: " + err));
});

// find a document by ID
// /exercises/:id
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.json("Error: " + err));
});

// update a document by ID
// /exercises/:id
router.route("/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.name = req.body.name;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.location = req.body.location;
      exercise.equipment = req.body.equipment;
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated"))
        .catch(err => res.json("Error: " + err));
    })
    .catch(err => res.json("Error: " + err));
});

// delete a document by ID
// /exercises/:id
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch(err => res.json("Error: " + err));
});

// export
module.exports = router;
