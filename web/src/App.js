import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import BetHistory from './components/BetHistory';
import BetSummary from './components/BetSummary';
// import users from './data/users';
import bets from './data/bets';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <BetSummary bets={bets} />
        <BetHistory bets={bets} />
      </div>
    );
  }
}

export default App;
