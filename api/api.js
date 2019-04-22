const express = require('express');
const app = express();

const bets = [
    {
        "id": 1,
        "better": "Caroline",
        "bettee": "Jon",
        "bet": "Jon will put away his washing today",
        "outcome": true
    },
    {
        "id": 2,
        "better": "Jon",
        "bettee": "Caroline",
        "bet": "Caroline will win more bets than Jon",
        "outcome": false
    },
    {
        "id": 3,
        "better": "Jon",
        "bettee": "Caroline",
        "bet": "Cuddles won't meow in Caroline's face tonight",
        "outcome": true
    },
    {
        "id": 4,
        "better": "Caroline",
        "bettee": "Jon",
        "bet": "The soccer game tonight will be exciting and high scoring",
        "outcome": false
    },
    {
        "id": 5,
        "better": "Caroline",
        "bettee": "Jon",
        "bet": "The soccer game tonight will be exciting and high scoring",
        "outcome": false
    },
    {
        "id": 6,
        "better": "Jon",
        "bettee": "Caroline",
        "bet": "Our app will be really cool",
        "outcome": true
    },
    {
        "id": 7,
        "better": "Jon",
        "bettee": "Caroline",
        "bet": "Our app will handle unresolved bets",
        "outcome": null
    }
]

app.use(express.json());

app.get('/', (req, res) => {
    res.send('api connected');
});

app.get('/bets', (req, res) => {
    res.send(bets);
});

app.get('/bets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bet = bets.find((b) => b.id === id);

    res.send(bet);
});

app.post('/bets', (req, res) => {
    const {better, bettee, bet} = req.body;
    const id = bets.length + 1;
    
    const newBet = {
        "id": id,
        "better": better,
        "bettee": bettee,
        "bet": bet,
        "outcome": null
    }

    bets.push(newBet);
    res.send(newBet);    
});

app.put('/bets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bet = bets.find((b) => b.id === id);
    const {outcome} = req.body;

    bet.outcome = outcome;

    res.send(bet);
});

app.delete('/bets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bet = bets.find((b) => b.id === id);
    const index = bets.indexOf(bet);

    bets.splice(index, 1);

    res.send(bet);
});

app.listen(5000, () => {
    console.log('listening on port 5000');
});