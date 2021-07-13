import routes from "./routes";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./containers/login";
import { HOMEPAGE, LOGIN_URL } from "./constants";
import TheLayout from "containers/layouts/layout/TheLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={LOGIN_URL} component={Login} />

        {routes.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                component={TheLayout(route.component)}
              />
            )
          );
        })}
        <Redirect from={HOMEPAGE} to={LOGIN_URL} />
      </Switch>
    </Router>
  );
}
export default App;
