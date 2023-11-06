const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = 8080;
app.use(morgan("common"));
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride("_method")); // Specify the method override field

// Dummy data for users and movies
let users = [];

let movies = [];

// Routes for Users
app.get("/users", (req, res) => {
  res.send("Get all users"); // Action to retrieve all users
});

app.get("/users/:user_id", (req, res) => {
  res.send(`Get user with ID ${req.params.user_id}`); // Action to retrieve a specific user
});

app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.put("/users/:user_id", (req, res) => {
  res.send(`Update user with ID ${req.params.user_id}`); // Action to update a user
});

app.delete("/users/:user_id", (req, res) => {
  res.send(`Delete user with ID ${req.params.user_id}`); // Action to delete a user
});

// Routes for Movies

app.get("/movies", (req, res) => {
  res.send("Get all movies"); // Action to retrieve all movies
});

app.get("/movies/:movie_id", (req, res) => {
  res.send(`Get movie with ID ${req.params.movie_id}`); // Action to retrieve a specific movie
});

app.post("/movies", (req, res) => {
  res.send("Create a new movie"); // Action to create a new movie
});

app.put("/movies/:movie_id", (req, res) => {
  res.send(`Update movie with ID ${req.params.movie_id}`); // Action to update a movie
});

app.delete("/movies/:movie_id", (req, res) => {
  res.send(`Delete movie with ID ${req.params.movie_id}`); // Action to delete a movie
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
