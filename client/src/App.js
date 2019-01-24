import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    console.log('HELLO');

    fetch('http://localhost:8080', {
      method: 'GET'
    }).then(res => res.json()).then(data => console.log(data));
    

  }
  

  render() {
    return (
      <div className="App">
          <h1>Hello Karin</h1>
      </div>
    );
  }
}

export default App;
