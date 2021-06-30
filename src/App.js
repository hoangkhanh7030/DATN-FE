import routes from "./routes";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import TheLayout from "./containers/layouts/TheLayout/TheLayout";
import Login from "./containers/Login";
function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/login"} component={Login} />

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
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}
export default App;
