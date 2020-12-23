import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import history from './history';
import './App.css';
import Home from './components/home/Home';

import AppState from './context/AppState';
import OrderDetails from './components/OrderDetails';
import OrderByPrescription from './components/OrderByPrescription';
import OrderReview from './components/OrderReview';
import MedicineDetails from './components/MedicineDetails';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <>
      <AppState>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/order-details' component={OrderDetails} />
            <Route
              exact
              path='/medicine-details/:name/:id'
              component={MedicineDetails}
            />
            <Route
              exact
              path='/order-by-prescription'
              component={OrderByPrescription}
            />
            <Route exact path='/order-review' component={OrderReview} />
            <Route exact path='/about-us' component={AboutUs} />
          </Switch>
        </Router>
      </AppState>
    </>
  );
}

export default App;
