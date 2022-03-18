import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Menu from "./Components/Menu/Menu";
import Game from "./Components/Game/Game";
import Leaderboards from "./Components/Leaderboards/Leaderboards";

const App = () => (
  <Router>
    <Route path="/" exact component={Menu} />
    <Route path="/game" component={Game} />
    <Route path="/leaderboards" component={Leaderboards} />
  </Router>
);
export default App;
