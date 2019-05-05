const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log('connected to db'))
  .catch(err => console.log('could not connect to db'));

const competitions = [
  {
    id: 3,
    person1: 'jon@me.com',
    person2: 'caro@me.com',
    bets: [
      {
        id: 1,
        better: 'Caroline',
        bettee: 'Jon',
        bet: 'Jon will put away his washing today',
        outcome: true
      },
      {
        id: 2,
        better: 'Jon',
        bettee: 'Caroline',
        bet: 'Caroline will win more bets than Jon',
        outcome: false
      },
      {
        id: 3,
        better: 'Jon',
        bettee: 'Caroline',
        bet: "Cuddles won't meow in Caroline's face tonight",
        outcome: true
      },
      {
        id: 4,
        better: 'Caroline',
        bettee: 'Jon',
        bet: 'The soccer game tonight will be exciting and high scoring',
        outcome: false
      },
      {
        id: 5,
        better: 'Caroline',
        bettee: 'Jon',
        bet: 'The soccer game tonight will be exciting and high scoring',
        outcome: false
      },
      {
        id: 6,
        better: 'Jon',
        bettee: 'Caroline',
        bet: 'Our app will be really cool',
        outcome: true
      },
      {
        id: 7,
        better: 'Jon',
        bettee: 'Caroline',
        bet: 'Our app will handle unresolved bets',
        outcome: null
      }
    ]
  }
];

const User = require('./models/User');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('api connected');
});

app.post('/register', (req, res) => {
  // 1. pull email and first name and last name off req.body
  // 2. validate that email and names were provided by user
  // 3. validate that the email is unique - not in db - LOG THEM IN
  // 4. create new user - LOG THEM IN

  const { email, firstName, lastName } = req.body;

  if (!email || !firstName || !lastName)
    return res.status(401).send('Could not create a user with those fields');

  User.findOne({ email })
    .then(doc => {
      if (doc) return res.status(405).send('User already exists in db');
      const user = new User({
        email,
        firstName,
        lastName
      });
      user
        .save()
        .then(newUser => {
          res.send(newUser);
        })
        .catch(err => res.send('There was an error creating the user'));
    })
    .catch(err => res.send('Connection error'));
});

app.post('/login', (req, res) => {
  // 1. pull email and first name and last name off req.body
  // 2. validate that email and names were provided by user
  // 3. validate that the email is unique - not in db - LOG THEM IN
  // 4. create new user - LOG THEM IN

  const { email } = req.body;

  if (!email) return res.status(401).send('No email provided');

  User.findOne({ email })
    .then(doc => {
      if (!doc) return res.status(404).send('User not found');
      res.send('Successfully logged in');
    })
    .catch(err => res.send('Connection error'));
});

app.get('/competitions', (req, res) => {
  // 1. pull out token from headers
  // 2. validate token with the server
  // 3. pull out user from token
  // 4. request comps from the db for that user
  // 5. send back comps or empty array
  res.send(competitions);
});

app.get('/competitions/:compId', (req, res) => {
  const compId = parseInt(req.params.compId);
  const competition = competitions.find(c => c.id === compId);
  competition
    ? res.send(competition)
    : res.status(404).send('Could not find that competition');
});

app.get('/competitions/:compId/bets', (req, res) => {
  const compId = parseInt(req.params.compId);
  const competition = competitions.find(c => c.id === compId);
  competition
    ? res.send(competition.bets)
    : res.status(404).send('Could not find that competition');
});

app.post('/competitions/:compId/bets', (req, res) => {
  const compId = parseInt(req.params.compId);
  const competition = competitions.find(c => c.id === compId);

  if (!competition)
    return res.status(404).send('Could not find that competition');

  const { better, bettee, bet } = req.body;

  if (!better || !bettee || !bet)
    return res
      .status(401)
      .send('Could not create bet with the information provided');

  const { bets } = competition;
  const id = bets.length + 1;

  const newBet = {
    id: id,
    better: better,
    bettee: bettee,
    bet: bet,
    outcome: null
  };

  bets.push(newBet);
  res.send(newBet);
});

app.put('/competitions/:compId/bets/:betId', (req, res) => {
  const compId = parseInt(req.params.compId);
  const competition = competitions.find(c => c.id === compId);

  if (!competition)
    return res.status(404).send('Could not find that competition');

  const { bets } = competition;
  const betId = parseInt(req.params.betId);
  const bet = bets.find(b => b.id === betId);

  if (!bet) return res.status(404).send('Could not find that bet');

  const { outcome } = req.body;

  if (typeof outcome !== 'boolean')
    return res.status(401).send('Could not resolve bet');

  bet.outcome = outcome;

  res.send(bet);
});

app.delete('/competitions/:compId/bets/:betId', (req, res) => {
  const compId = parseInt(req.params.compId);
  const competition = competitions.find(c => c.id === compId);

  if (!competition)
    return res.status(404).send('Could not find that competition');

  const { bets } = competition;
  const betId = parseInt(req.params.betId);
  const bet = bets.find(b => b.id === betId);

  if (!bet) return res.status(404).send('Could not find that bet');

  const index = bets.indexOf(bet);
  bets.splice(index, 1);

  res.send(bet);
});

app.listen(5000, () => {
  console.log('listening on port 5000');
});
