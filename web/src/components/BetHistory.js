import React, { Fragment } from 'react';
import './BetHistory.css';

const renderBet = (bet) => {
    return (
        <div className="bet-wrapper" key={bet.id}>
            <p className="bet-grid">
                <span className={bet.better === 'Caroline' ? 'person1' : 'person2'}>
                    {bet.better}
                </span>
                <span>bet</span>
                <span className={bet.bettee === 'Caroline' ? 'person1' : 'person2'}>
                    {bet.bettee}
                </span>
                <span className="bet-text">{bet.bet}</span>
                <span>{bet.outcome ? "+$5" : "-$5"}</span>
            </p>
        </div>
    );
}

const BetHistory = (props) => {
    const {bets} = props;

    return (
        <div className="history-container">
            <div className="history-wrapper">
                {bets.map(renderBet)}
            </div>
        </div>
    );
}

export default BetHistory;