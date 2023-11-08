const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(methodOverride("_method")); // Specify the method override field

app.get("/", (req, res) => {
  res.send("Welcome to MyFlix!");
});

// Routes for Users
app.get("/users", async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/users/:Username", async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.post("/users", async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

app.put("/users/:Username", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.delete("/users/:Username", async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
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

app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});
