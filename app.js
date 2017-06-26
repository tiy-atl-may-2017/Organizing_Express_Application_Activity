const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: 'tROi$ e+ D3uX Et 1',
  resave: false,
  saveUninitialized: true
}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set ('view engine', 'mustache');

let numberObj = {};
let wordObj = {};

// Routes

app.get('/', function(req, res) {
  numberObj = {};
  wordObj = {};
  res.render('index');
});

app.get('/number', function(req, res) {
  res.render('number', numberObj);
});

app.get('/word', function(req, res) {
  res.render('word', wordObj);
});

app.post('/number/rng', function(req, res) {
  randomNumberGenerator();
  res.redirect('/number');
});

app.post('/word/list', function(req, res) {
  randomWordsGenerator();
  res.redirect('/word');
});

app.post('/number/list', function(req, res) {
  randomNumbersGenerator();
  res.redirect('/number');
});

app.post('/word/random', function(req, res) {
  randomWordGenerator();
  res.redirect('/word');
});

app.listen(8000, function() {
  console.log("Working hard... Listening on 8000");
});

// Functions

function randomNumberGenerator() {
  numberObj.number = [];
  numberObj.number = Math.floor(Math.random() * 1000000);
};

function randomWordGenerator() {
  wordObj.words = [];
  wordObj.words.push(words[Math.floor(Math.random() * words.length)]);
};

function randomWordsGenerator() {
  wordObj.words = [];
  for (var i = 0; i < 15; i++) {
    let rng = Math.floor(Math.random() * words.length);
    wordObj.words.push(words[rng]);
  };
};

function randomNumbersGenerator() {
  numberObj.number = [];
  for (var i = 0; i < 15; i++) {
    let rng = Math.floor(Math.random() * 1000000);
    numberObj.number.push(rng);
  };
};
