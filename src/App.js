import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import history from "./hisotry";
import { ProtectedRouteForLogin, ProtectedRoute } from "./views/pages/loginTimeTrack/loginAuth";
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { useDispatch } from 'react-redux';
import NetworkService from './network-service'
import store from './redux/store'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Email App
const TheEmailApp = React.lazy(() => import("./views/apps/email/TheEmailApp"));

// Pages
const Login = React.lazy(() => import("./views/pages/loginTimeTrack/LoginApp"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const PaaswordRest = React.lazy(() => import("./views/pages/passwordRest/PasswordReset"));

const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

function App() {

  const dispatch = useDispatch();
  const history = useHistory();

  NetworkService.setupInterceptors(store, history);
  axios.interceptors.request.use(request => {
    request.headers.Authorization = `Bearer ${localStorage.getItem("Token")}`;
    return request;
  })


  return (
    <BrowserRouter history={history}>
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
    </BrowserRouter>
  );
}


export default App;
