import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import BookingsList from './components/bookingsList';
import Home from './components/home';


const App = () => {
  return (
    <Router>
      <div className="container-fluid d-flex panel">
        <nav className="navbar d-flex flex-column justify-content-center">
          <h3 className="text-white"><strong>Place</strong>it</h3>
          <div className="d-flex flex-column">
            <Link className="text-white" to="/"><i className="fa fa-home green-title mr-2"/>Movies</Link>
            <Link className="text-white" to="/bookings"><i className="fa fa-calendar green-title mr-2"/>Bookings</Link>
          </div>
        </nav>
        <Switch>
          <main className="dashboard container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/bookings">
              <BookingsList />
            </Route>
          </main>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
