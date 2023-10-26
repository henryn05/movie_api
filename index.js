const express = require('express');
  bodyParser = require("body-parser");
  methodOverride = require("method-override");
  morgan = require('morgan');
  path = require('path');

const app = express();
const port = 8080
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

app.get('/movies', (req, res) => {
  let topMovies = [
    {
      title: 'Dr. Strangelove ',
      director: 'Stanley Kubric',
      genre: 'War',
    },

    {
      title: "Schindler's List",
      director: 'Steven Spielberg',
      genre: 'War',
    },

    {
      title: 'There Will Be Blood',
      director: 'Paul Anderson',
      genre: 'Drama',
    },

    {
      title: 'No Country For Old Men',
      director: 'Ethan Coen',
      genre: 'Drama',
    },

    {
      title: 'Arrival',
      director: 'Denis Villeneuve',
      genre: 'Sci-Fi',
    },

    {
      title: 'Memento',
      director: 'Christopher Nolan',
      genre: 'Drama',
    },

    {
      title: 'The Good, the Bad, the Ugly',
      director: 'Sergio Leone',
      genre: 'Western',
    },

    {
      title: 'The Witch',
      director: 'Robert Eggers',
      genre: 'Horror',
    },

    {
      title: 'Chinatown',
      director: 'Roman Polanski',
      genre: 'Crime',
    },

    {
      title: 'Goodfellas',
      director: 'Martin Scorsese',
      genre: 'Crime',
    },
  ];

  res.json(topMovies);
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});