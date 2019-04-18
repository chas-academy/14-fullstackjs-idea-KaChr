import React, { Component } from 'react';
//Import from redux
import store from './store';
//Provides application with store
import { Provider } from 'react-redux';

// Import components
import { Register, Login } from './components';
//Import CSS
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="App">
            <h1>Hello Karin</h1>
            <Login />
            <Register />
        </div>
      </Provider>
    );
  }
}

export default App;
