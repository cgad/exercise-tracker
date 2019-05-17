// get express router
const router = require("express").Router();

// import user model
const User = require("../models/user.model");

// get all users
// /users/ endpoint
router.route("/").get((req, res) => {
  // get all users in DB
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// add a user
// /users/add endpoint
router.route("/add").post((req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });

  // save new exercise document to DB
  newUser
    .save()
    .then(() => res.json("User added"))
    .catch(err => res.status(400).json("Error: " + err));
});

// find a user by ID
// /users/:id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(user => req.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});

// delete a user by ID
// /users/:id
router.route("/:id").get((req, res) => {
  User.findByIdAndDelete
    .then(() => res.json("User deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

// export
module.exports = router;
