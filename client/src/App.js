import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import history from './history';
import './App.css';
import Home from './components/home/Home';

import AppState from './context/AppState';
import OrderDetails from './components/OrderDetails';

function App() {
  return (
    <>
      <AppState>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/order-details' component={OrderDetails} />
          </Switch>
        </Router>
      </AppState>
    </>
  );
}

export default App;
