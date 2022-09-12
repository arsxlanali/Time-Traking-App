import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const auth = localStorage.getItem('Token');
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }
        else {
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
  );
};



export const ProtectedRouteForLogin = ({ path, component: Component, render, ...rest }) => {
  const auth = localStorage.getItem('Token');
  return (
    <Route
      {...rest}
      render={props => {
        if (auth) {
          return (
            <Redirect
              to={{
                pathname: "/viewsheet",
                state: { from: props.location }
              }}
            />
          );
        }
        else {
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
  );
};