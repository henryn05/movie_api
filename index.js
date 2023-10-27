const express = require("express");
  bodyParser = require("body-parser");
  methodOverride = require("method-override");
  morgan = require("morgan");
  path = require("path");

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
let users = [
];

let movies = [
  {
    title: "Dr. Strangelove ",
    director: "Stanley Kubric",
    genre: "War",
  },

  {
    title: "Schindler's List",
    director: "Steven Spielberg",
    genre: "War",
  },

  {
    title: "There Will Be Blood",
    director: "Paul Anderson",
    genre: "Drama",
  },

  {
    title: "No Country For Old Men",
    director: "Ethan Coen",
    genre: "Drama",
  },

  {
    title: "Arrival",
    director: "Denis Villeneuve",
    genre: "Sci-Fi",
  },

  {
    title: "Memento",
    director: "Christopher Nolan",
    genre: "Drama",
  },

  {
    title: "The Good, the Bad, the Ugly",
    director: "Sergio Leone",
    genre: "Western",
  },

  {
    title: "The Witch",
    director: "Robert Eggers",
    genre: "Horror",
  },

  {
    title: "Chinatown",
    director: "Roman Polanski",
    genre: "Crime",
  },

  {
    title: "Goodfellas",
    director: "Martin Scorsese",
    genre: "Crime",
  },
];

// Routes for Users
app.get("/users", (req, res) => {
  res.send("Get all users"); // Action to retrieve all users
});

app.get("/users/:user_id", (req, res) => {
  res.send(`Get user with ID ${req.params.user_id}`); // Action to retrieve a specific user
});

app.post("/users", (req, res) => {
  res.send("Create a new user"); // Action to create a new user
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