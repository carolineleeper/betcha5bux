import React, { Fragment } from 'react';
import './BetHistory.css';

const renderBet = (bet) => {
    return (
        <div className="bet-wrapper" key={bet.id}>
            <p className="bet-grid">
                <span className={`${bet.better === 'Caroline' ? 'person1' : 'person2'} one`}>
                    {bet.better}
                </span>
                <span className="two">bet</span>
                <span className={`${bet.bettee === 'Caroline' ? 'person1' : 'person2'} three`}>
                    {bet.bettee}
                </span>
                <span className="bet-text four">{bet.bet}</span>
                {bet.outcome === null ? <span className="five">pending</span> : (
                    <span className="five">{bet.outcome ? "+$5" : "-$5"}</span>
                )}
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