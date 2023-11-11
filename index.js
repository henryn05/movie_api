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
  await Users.findOne({ Username: req.params.username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.post("/users", async (req, res) => {
  await Users.findOne({ Username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + " already exists");
      } else {
        Users.create({
          Username: req.body.username,
          Password: req.body.password,
          Email: req.body.email,
          Birthday: req.body.birthday,
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
    { Username: req.params.username },
    {
      $set: {
        Username: req.body.username,
        Password: req.body.password,
        Email: req.body.email,
        Birthday: req.body.birthday,
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
  await Users.findOneAndRemove({ Username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + " was not found");
      } else {
        res.status(200).send(req.params.username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Routes for Movies
app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/movies/:Title", async (req, res) => {
  await Movies.findOne({ Title: req.params.title })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.post("/movies", async (req, res) => {
  await Movies.findOne({ Title: req.body.title })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.title + " already exists");
      } else {
        Movies.create({
          Title: req.body.title,
          // Genre: req.body.genre,
          // Director: req.body.director,
          ReleaseYear: req.body.releaseYear,
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

app.put("/movies/:Title", async (req, res) => {
  await Movies.findOneAndUpdate(
    { Title: req.params.title },
    {
      $set: {
        Title: req.body.title,
        // Genre: req.body.genre,
        // Director: req.body.director,
        ReleaseYear: req.body.releaseYear,
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

app.delete("/movies/:Title", async (req, res) => {
  await Movies.findOneAndRemove({ Title: req.params.title })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.title + " was not found");
      } else {
        res.status(200).send(req.params.title + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Routes for Genres
app.get("/genres", async (req, res) => {
  await Genres.find()
    .then((genres) => {
      res.status(201).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/genres/:Name", async (req, res) => {
  await Genres.findOne({ Name: req.params.name })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.post("/genres", async (req, res) => {
  await Genres.findOne({ Name: req.body.name })
    .then((genre) => {
      if (genre) {
        return res.status(400).send(req.body.name + " already exists");
      } else {
        Genres.create({
          Name: req.body.name,
          Description: req.body.description,
        })
          .then((newGenre) => {
            res.status(201).json(newGenre);
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

app.put("/genres/:Name", async (req, res) => {
  await Genres.findOneAndUpdate(
    { Name: req.params.name },
    {
      $set: {
        Name: req.body.name,
        Description: req.body.description,
      },
    },
    { new: true }
  )
    .then((updatedGenre) => {
      res.json(updatedGenre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.delete("/genres/:Name", async (req, res) => {
  await Genres.findOneAndRemove({ Name: req.params.name })
    .then((genre) => {
      if (!genre) {
        res.status(400).send(req.params.name + " was not found");
      } else {
        res.status(200).send(req.params.name + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Routes for Directors
app.get("/directors", async (req, res) => {
  await Directors.find()
    .then((directors) => {
      res.status(201).json(directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/directors/:Name", async (req, res) => {
  await Directors.findOne({ Name: req.params.name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.post("/directors", async (req, res) => {
  await Directors.findOne({ Name: req.body.name })
    .then((director) => {
      if (director) {
        return res.status(400).send(req.body.name + " already exists");
      } else {
        Directors.create({
          Name: req.body.name,
          // Birthdate: req.body.birthdate,
          // Movies: req.body.movies,
        })
          .then((newDirector) => {
            res.status(201).json(newDirector);
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

app.put("/directors/:Name", async (req, res) => {
  await Directors.findOneAndUpdate(
    { Name: req.params.name },
    {
      $set: {
        Name: req.body.name,
        // Birthdate: req.body.birthdate,
        // Movies: req.body.movies,
      },
    },
    { new: true }
  )
    .then((updatedDirector) => {
      res.json(updatedDirector);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.delete("/directors/:Name", async (req, res) => {
  await Directors.findOneAndRemove({ Name: req.params.name })
    .then((director) => {
      if (!director) {
        res.status(400).send(req.params.name + " was not found");
      } else {
        res.status(200).send(req.params.name + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});
