import React from 'react';
import { Route, Switch } from 'react-router';

import Navbar from './Components/Landing Page/Navbar';
import Home from './Components/Landing Page/Home';
import Login from './Components/User Auth/Login';
import Register from './Components/User Auth/Register';

const Router = (props) => {
  const { isLoggedIn, handleToggleUser } = props;
  return (
    <>
      {/* Navbar Linking*/}
      <Navbar isLoggedIn={isLoggedIn} handleToggleUser={handleToggleUser} />

      {/* Route Controller */}
      <Switch>
        <Route exact={true} path='/' component={Home} />
        <Route
          path='/login'
          render={(props) => {
            return <Login {...props} handleToggleUser={handleToggleUser} />;
          }}
        />
        <Route path='/register' component={Register} />
      </Switch>
    </>
  );
};

export default Router;
