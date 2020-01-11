import React from "react";
import "../styles/gameconsole.css";
import { setInterval } from "timers";
import ButtonActions from "./buttonActions";

class GameConsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: ["1:1", "2:1", "3:1", "4:1"],
      direction: "+x",
      points: 0,
      internvalId: null,
      over: false,
      appleCordinate: "5:5"
    };
    this.moveSnakeDirection = this.moveSnakeDirection.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.getHeadOfSnake = this.getHeadOfSnake.bind(this);
    this.stopSnake = this.stopSnake.bind(this);
    this.startSnake = this.startSnake.bind(this);
    this.changeDirection = this.changeDirection.bind(this);
    this.havingDuplicates = this.havingDuplicates.bind(this);
    this.checkColision = this.checkColision.bind(this);
    this.getAppleCordinate = this.getAppleCordinate.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.snakeInterval = null;
  }

  getAppleCordinate() {
    let appleNewCord =
      Math.floor(Math.random() * 20) +
      1 +
      ":" +
      Math.floor(Math.random() * 20 + 1);
    if (this.state.snake.includes(appleNewCord))
      return this.getAppleCordinate();
    return appleNewCord;
  }
  havingDuplicates(arr, nextX, nextY) {
    let sorted_arr = arr.slice().sort();
    sorted_arr.push(nextX + ":" + nextY);
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] === sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results.length > 0 ? true : false;
  }

  checkColision(nextX, nextY) {
    let snakeCordinates = this.state.snake;
    if (this.havingDuplicates(snakeCordinates, nextX, nextY)) {
      this.stopSnake("over");
      return true;
    }
    if (
      parseInt(nextX) < 1 ||
      parseInt(nextY) < 1 ||
      parseInt(nextX) > 20 ||
      parseInt(nextY) > 20
    ) {
      this.stopSnake("over");
      return true;
    }
    return false;
  }

  restartGame() {
    this.setState(prevstate => {
      return {
        snake: ["1:1", "2:1", "3:1", "4:1"],
        direction: "+x",
        points: 0,
        over: false
      };
    });
    this.startSnake();
  }
  startSnake() {
    console.log("Starting?");
    this.snakeInterval = setInterval(this.moveSnake, 140);
  }

  changeDirection(dir) {
    this.setState(prevstate => {
      return { ...prevstate, direction: dir };
    });
  }

  moveSnake() {
    console.log("SNAKE : " + this.state.snake);
    let d = this.state.direction;
    switch (d) {
      case "+x":
        this.moveSnakeDirection("+x");
        break;
      case "-x":
        this.moveSnakeDirection("-x");
        break;
      case "+y":
        this.moveSnakeDirection("+y");
        break;
      case "-y":
        this.moveSnakeDirection("-y");
        break;
      default:
        break;
    }
  }
  getHeadOfSnake(snakeCordinate) {
    return snakeCordinate[snakeCordinate.length - 1];
  }

  moveSnakeDirection(dir) {
    console.log("Moving : " + dir);
    let currentSnake = this.state.snake;
    let headOfSnake = this.getHeadOfSnake(currentSnake);
    let coordinateOfHead = headOfSnake.split(":");
    let nextX = parseInt(coordinateOfHead[0]);
    let nextY = parseInt(coordinateOfHead[1]);
    switch (dir) {
      case "+x":
        nextX++;
        break;
      case "-x":
        nextX--;
        break;
      case "+y":
        nextY++;
        break;
      case "-y":
        nextY--;
        break;
      default:
        break;
    }
    if (!this.checkColision(nextX, nextY)) {
      console.log("Inserting : " + nextX + ":" + nextY);
      let appleCordinate = this.state.appleCordinate;
      let points = this.state.points;
      if (nextX + ":" + nextY !== appleCordinate) {
        currentSnake.splice(0, 1);
      } else {
        points = parseInt(points) + 5;
        appleCordinate = this.getAppleCordinate();
      }
      currentSnake.push(nextX + ":" + nextY);
      this.setState(prevstate => {
        return { snake: currentSnake, direction: dir, appleCordinate, points };
      });
    } else {
      this.setState(prevstate => {
        return { over: true };
      });
    }
  }

  stopSnake() {
    console.log("Stopping Snake : " + this.snakeInterval._id);
    clearInterval(this.snakeInterval._id);
  }

  componentDidMount() {
    let appleCordinate = this.getAppleCordinate();
    this.setState(prevstate => {
      return { ...prevstate, appleCordinate: appleCordinate };
    });
    this.startSnake();
  }

  componentWillUnmount() {
    this.stopSnake();
  }

  goHome = event => {
    let user = this.props.lastScore.by;
    let score = this.state.points;
    this.props.onClick(user, score);
  };

  render() {
    const boxes = [];
    const snakeActions = {
      up: this.moveSnakeDirection,
      down: this.moveSnakeDirection,
      left: this.moveSnakeDirection,
      right: this.moveSnakeDirection,
      pause: this.stopSnake,
      start: this.startSnake,
      restart: this.restartGame
    };
    const data = {
      direction: this.state.direction,
      gameOver: this.state.over,
      points: this.state.points
    };
    for (var y = 1; y <= 20; y++) {
      for (var x = 1; x <= 20; x++) {
        let key = x + ":" + y;
        if (key === this.state.appleCordinate) {
          boxes.push(
            <div key={key} className="box">
              <img
                src={process.env.PUBLIC_URL + "/images/apple.png"}
                alt="Apple Pic"
                className="apple"
              />
            </div>
          );
        } else if (this.state.snake.includes(key)) {
          if (key === this.getHeadOfSnake(this.state.snake)) {
            boxes.push(
              <div key={key} className="box">
                <div
                  className="snake"
                  style={{
                    fontSize: "27px",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    border: 0
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/snakeface.png"}
                    width="26px"
                    alt="Snake Mouth"
                  />
                </div>
              </div>
            );
          } else {
            boxes.push(
              <div key={key} className="box">
                <div className="snake"></div>
              </div>
            );
          }
        } else {
          boxes.push(<div key={key} className="box"></div>);
        }
      }
    }
    return (
      <React.Fragment>
        <div id="gameConsole">
          <div className="game">{boxes}</div>
        </div>
        <div className="board">
          <ButtonActions actions={snakeActions} data={data} />
          <h2>PLAYER : {this.props.lastScore.by} </h2>
          <h2>POINTS : {this.state.points}</h2>
          <button onClick={this.goHome}>Home</button>
        </div>
      </React.Fragment>
    );
  }
}

export default GameConsole;
