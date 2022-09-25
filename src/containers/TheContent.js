import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  const role = localStorage.getItem("Role");
  var filteredRoutes = {};
  if (role === "EMPLOYEE") {
    filteredRoutes = routes.filter((obj) => {
      return (obj.path === "/viewsheet" || obj.path === "/reports");
    })
  }
  else if (role === "MANAGEMENT") {
    filteredRoutes = routes.filter((obj) => {
      return (obj.path !== "/editemployee" && obj.path !== "/addemployee");
    })
  }
  else {
    filteredRoutes = routes.slice();
  }
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {filteredRoutes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/viewsheet" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
