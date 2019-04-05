import React, { Component } from 'react';
import logo from './logo.svg';

import BodyGridContainer from './components/BodyGridContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">        
        <BodyGridContainer/>
      </div>
    );
  }
}

export default App;
