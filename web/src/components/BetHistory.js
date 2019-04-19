import React, { Fragment } from 'react';

const renderBet = (bet) => {
    return (
    <Fragment key={bet.id}>
        <p>{bet.better} bet {bet.bettee} {bet.bet}</p>
        <p>{bet.outcome ? "+$5" : "-$5"}</p>
    </Fragment>
    )
}

const BetHistory = (props) => {
    const {bets} = props;

    return (
        <div>
            {bets.map(renderBet)}
        </div>
    );
}

export default BetHistory;