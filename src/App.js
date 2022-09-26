import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, Router } from "react-router-dom";
import "./scss/style.scss";
import history from "./hisotry";
import { ProtectedRouteForLogin, ProtectedRoute } from "./views/pages/loginTimeTrack/LoginAuth";
import axios from 'axios';
import NetworkService from './network-service'
import store from './redux/store'
// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
// Pages
const Login = React.lazy(() => import("./views/pages/loginTimeTrack/LoginApp"));
// const Register = React.lazy(() => import("./views/pages/register/Register"));
const PaaswordRest = React.lazy(() => import("./views/pages/passwordRest/PasswordReset"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

NetworkService.setupInterceptorsRequest();
NetworkService.setupInterceptorsResponse(store, history);

function App() {
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
  return (
    <>
      <Router history={history}>
        <React.Suspense fallback={loading}>
          <Switch>
            <ProtectedRouteForLogin exact path="/login" name="Login" render={props => <Login {...props} />} />
            <Route
              exact
              path="/passwordrest"
              name="Rest Password"
              render={(props) => <PaaswordRest {...props} />}
            />
            <Route
              exact
              path=".404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <ProtectedRoute
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </Router>
      <ToastContainer autoClose={4000} limit={1} />

    </>
  );
}


export default App;
