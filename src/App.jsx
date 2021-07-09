import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import "bulma/css/bulma.min.css";

const App = () => (
  <Router>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/player">
      <Player />
    </Route>
  </Router>
);

export default App;
