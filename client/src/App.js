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
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Browse from './components/browse_medicines/Browse';

import Login from './components/users/Login';
import SignUp from './components/users/SignUp';
import User from './components/users/User';

function App() {
  return (
    <>
      <AppState>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/user' component={User} />
            <Route exact path='/order-details' component={OrderDetails} />
            <Route
              exact
              path='/browse-medicines/page/:page'
              component={Browse}
            />
            <Route
              exact
              path='/medicine-details/:id'
              component={MedicineDetails}
            />
            <Route
              exact
              path='/order-by-prescription'
              component={OrderByPrescription}
            />
            <Route exact path='/order-review' component={OrderReview} />
            <Route exact path='/about-us' component={AboutUs} />
            <Route exact path='/privacy-policy' component={Privacy} />
            <Route exact path='/terms-and-conditions' component={Terms} />
          </Switch>
        </Router>
      </AppState>
    </>
  );
}

export default App;
