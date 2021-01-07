import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { TokenService } from '../services/storage.service';
function PrivateRoute({ children, ...rest }) {
    
    return (
      <Route
        {...rest}
        render={({ location }) =>
        TokenService.getToken() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
export default PrivateRoute;