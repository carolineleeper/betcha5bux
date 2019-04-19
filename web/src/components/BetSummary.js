import React, {Component} from 'react';

class BetSummary extends Component {
    state = {
        winner: "",
        loser: "",
        amount: 0
    }

    setWinner(balance, better, bettee) {
        if (balance[better] > balance[bettee]) {
            this.setState({
                winner: better,
                loser: bettee,
                amount: balance[better]
            });
        }
        else if (balance[better] < balance[bettee]) {
            this.setState({
                winner: bettee,
                loser: better,
                amount: balance[bettee]
            });
        }
        else {
            this.setState({
                winner: "",
                loser: "",
                amount: 0
            });
        }
    }

    calculateSummary() {
        const { bets } = this.props;
        const {better, bettee} = bets[0];

        const balance = {
            [better]: 0,
            [bettee]: 0
        };

        bets.forEach((bet) => {
            balance[bet.better] += bet.outcome ? 5 : -5;
            balance[bet.bettee] += bet.outcome ? -5 : 5;
        });

        this.setWinner(balance, better, bettee);
    }

    componentDidMount() {
        this.calculateSummary();
    }

    render() {
        return this.state.amount === 0 ? (
            <p>It's a tie!</p>
        ) : (
            <>
                <p>{this.state.loser} owes {this.state.winner}</p>
                <p>${this.state.amount}</p>
            </>
        )
    }
}


export default BetSummary;
