import React from "react";
import GameConsole from "./components/gameconsole";
import Header from "./components/header";
import Welcome from "./components/welcome";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      highest: { score: 0, by: "Guest" },
      lastScore: { score: 0, by: "Guest" },
      isGame: false
    };
    this.switchBetweenGameAndWelcome = this.switchBetweenGameAndWelcome.bind(
      this
    );
    this.updateHighest = this.updateHighest.bind(this);
  }
  switchBetweenGameAndWelcome(username, score) {
    if (parseInt(score) > parseInt(this.state.highest.score)) {
      this.setState(prevstate => {
        return {
          isGame: !prevstate.isGame,
          highest: { score, by: username },
          lastScore: { score, by: username }
        };
      });
    } else {
      this.setState(prevstate => {
        return {
          isGame: !prevstate.isGame,
          lastScore: { score, by: username }
        };
      });
    }
  }

  updateHighest(l, name) {}
  render() {
    return (
      <div className="App">
        <Header />
        {this.state.isGame ? (
          <GameConsole
            onClick={this.switchBetweenGameAndWelcome}
            lastScore={this.state.lastScore}
          />
        ) : (
          <Welcome
            highest={this.state.highest}
            lastScore={this.state.lastScore}
            onClick={this.switchBetweenGameAndWelcome}
          />
        )}
      </div>
    );
  }
}

export default App;
