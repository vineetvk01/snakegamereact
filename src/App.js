import React from "react";
import GameConsole from "./components/gameconsole";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }
  render() {
    return (
      <div className="App">
        <GameConsole />
      </div>
    );
  }
}

export default App;
