import React, { Component } from 'react';
import './App.css';
import BetHistory from './components/BetHistory';
import BetSummary from './components/BetSummary';
// import users from './data/users';
import bets from './data/bets';

class App extends Component {
  render() {
    return (
      <>
        <BetSummary bets={bets} />
        <BetHistory bets={bets} />
      </>
    );
  }
}

export default App;
