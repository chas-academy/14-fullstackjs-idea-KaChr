import React, { Component } from 'react';
//Import from redux
import store from './store';
//Provides application with store
import { Provider } from 'react-redux';
//Import router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import components
import { Register, Login } from './components';
//Import CSS
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
        <div className="App">
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
