import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';  
import PrivateRoute from './hoc/PrivateRoute';
import { ListRoom } from './pages/ListRoom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { RoomDetails } from './pages/RoomDetails';


const App = () => {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute exact path="/rooms">
              <ListRoom />
            </PrivateRoute>
            <PrivateRoute exact path="/room/:id">
              <RoomDetails />
            </PrivateRoute>
        </Switch>
      </Router>
  )
}

export default App
