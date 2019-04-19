import React, {Component} from 'react';

class BetSummary extends Component {
    state = {
        winner: "",
        loser: "",
        amount: 0
    }

    calculateSummary() {
        const { bets } = this.props;
        const firstBet = bets[0];
        const summary = {
            [firstBet.better]: 0,
            [firstBet.bettee]: 0
        };

        bets.forEach((bet) => {
            summary[bet.better] += bet.outcome ? 5 : -5;
        });

        if (summary[firstBet.better] > summary[firstBet.bettee]) {
            this.setState({
                winner: firstBet.better,
                loser: firstBet.bettee,
                amount: summary[firstBet.better] - summary[firstBet.bettee]
            });
        }
        else if (summary[firstBet.better] < summary[firstBet.bettee]) {
            this.setState({
                winner: firstBet.bettee,
                loser: firstBet.better,
                amount: summary[firstBet.bettee] - summary[firstBet.better]
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
