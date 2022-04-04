import { Game } from "./Pages/Game/Game";
import banner from "./Assets/banner.png";

const App = () => (
  <div className="app-container">
    <img src={banner} className="banner" alt="" />
    <Game rows={9} columns={9} numMines={10} />
  </div>
);

export default App;
