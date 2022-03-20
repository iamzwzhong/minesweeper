import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Menu from "./Pages/Menu/Menu";
import Game from "./Pages/Game/Game";

const App = () => (
  <Router>
    <Route path="/" exact component={Menu} />
    <Route path="/game" component={Game} />
  </Router>
);
export default App;
