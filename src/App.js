import routes from "./routes";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import TheLayout from "./containers/layouts/TheLayout/TheLayout";

function App() {
  return (
    <Router>
      <Switch>
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
        <Redirect from="/" to="/workspaces" />
      </Switch>
    </Router>
  );
}

export default App;
