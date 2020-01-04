import React from "react";
import "../styles/gameconsole.css";
import { setInterval } from "timers";
import ButtonActions from "./buttonActions";

class GameConsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: ["1:1", "2:1", "3:1", "4:1", "5:1", "6:1", "7:1"],
      direction: "+x",
      points: 0,
      internvalId: null,
      over: false,
      appleCordinate: "5:5"
    };
    this.moveSnakeRight = this.moveSnakeRight.bind(this);
    this.moveSnakeLeft = this.moveSnakeLeft.bind(this);
    this.moveSnakeUp = this.moveSnakeUp.bind(this);
    this.moveSnakeDown = this.moveSnakeDown.bind(this);
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
    return (
      Math.floor(Math.random() * 10) +
      1 +
      ":" +
      Math.floor(Math.random() * 10 + 1)
    );
  }
  havingDuplicates(arr, nextX, nextY) {
    let sorted_arr = arr.slice().sort();
    sorted_arr.push(nextX + ":" + nextY);
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
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
      parseInt(nextX) > 10 ||
      parseInt(nextY) > 10
    ) {
      this.stopSnake("over");
      return true;
    }
    return false;
  }

  restartGame() {
    this.setState(prevstate => {
      return {
        snake: ["1:1", "2:1"],
        direction: "+x",
        points: 0,
        over: false
      };
    });
    this.startSnake();
  }
  startSnake() {
    this.snakeInterval = setInterval(this.moveSnake, 200);
    console.log(this.snakeInterval);
  }

  changeDirection(dir) {
    console.log(
      "Changing Direction: " + dir + " | Current Snake : " + this.state.snake
    );
    this.setState(prevstate => {
      return { ...prevstate, direction: dir };
    });
  }

  moveSnake() {
    console.log("SNAKE : " + this.state.snake);
    let d = this.state.direction;
    switch (d) {
      case "+x":
        this.moveSnakeRight();
        break;
      case "-x":
        this.moveSnakeLeft();
        break;
      case "+y":
        this.moveSnakeDown();
        break;
      case "-y":
        this.moveSnakeUp();
        break;
      default:
        break;
    }
  }
  getHeadOfSnake(snakeCordinate) {
    return snakeCordinate[snakeCordinate.length - 1];
  }

  moveSnakeRight() {
    console.log("Moving : +x ");
    let currentSnake = this.state.snake;
    let headOfSnake = this.getHeadOfSnake(currentSnake);
    let coordinateOfHead = headOfSnake.split(":");
    let nextX = parseInt(coordinateOfHead[0]) + 1;
    let nextY = coordinateOfHead[1];
    if (!this.checkColision(nextX, nextY)) {
      console.log("Inserting : " + nextX + ":" + nextY);
      let appleCordinate = this.state.appleCordinate;
      if (nextX + ":" + nextY != appleCordinate) {
        currentSnake.splice(0, 1);
      } else {
        appleCordinate = this.getAppleCordinate();
      }
      currentSnake.push(nextX + ":" + nextY);
      this.setState(prevstate => {
        return { snake: currentSnake, direction: "+x", appleCordinate };
      });
    } else {
      this.setState(prevstate => {
        return { over: true };
      });
    }
  }

  moveSnakeLeft() {
    console.log("Moving : -x ");
    let currentSnake = this.state.snake;
    let headOfSnake = this.getHeadOfSnake(currentSnake);
    let coordinateOfHead = headOfSnake.split(":");
    let nextX = parseInt(coordinateOfHead[0]) - 1;
    let nextY = coordinateOfHead[1];
    if (!this.checkColision(nextX, nextY)) {
      console.log("Inserting : " + nextX + ":" + nextY);
      let appleCordinate = this.state.appleCordinate;
      if (nextX + ":" + nextY != appleCordinate) {
        currentSnake.splice(0, 1);
      } else {
        appleCordinate = this.getAppleCordinate();
      }
      currentSnake.push(nextX + ":" + nextY);
      this.setState(prevstate => {
        return { snake: currentSnake, direction: "-x", appleCordinate };
      });
    } else {
      this.setState(prevstate => {
        return { over: true };
      });
    }
  }
  moveSnakeUp() {
    console.log("Moving : -y ");
    let currentSnake = this.state.snake;
    let headOfSnake = this.getHeadOfSnake(currentSnake);
    let coordinateOfHead = headOfSnake.split(":");
    let nextX = coordinateOfHead[0];
    let nextY = parseInt(coordinateOfHead[1]) - 1;
    if (!this.checkColision(nextX, nextY)) {
      console.log("Inserting : " + nextX + ":" + nextY);
      let appleCordinate = this.state.appleCordinate;
      if (nextX + ":" + nextY != appleCordinate) {
        currentSnake.splice(0, 1);
      } else {
        appleCordinate = this.getAppleCordinate();
      }
      currentSnake.push(nextX + ":" + nextY);
      this.setState(prevstate => {
        return { snake: currentSnake, direction: "-y", appleCordinate };
      });
    } else {
      this.setState(prevstate => {
        return { over: true };
      });
    }
  }
  moveSnakeDown() {
    console.log("Moving : +y " + this.state.snake);
    let currentSnake = this.state.snake;
    let headOfSnake = this.getHeadOfSnake(currentSnake);
    let coordinateOfHead = headOfSnake.split(":");
    let nextX = coordinateOfHead[0];
    let nextY = parseInt(coordinateOfHead[1]) + 1;
    if (!this.checkColision(nextX, nextY)) {
      console.log("Inserting : " + nextX + ":" + nextY);
      let appleCordinate = this.state.appleCordinate;
      if (nextX + ":" + nextY != appleCordinate) {
        currentSnake.splice(0, 1);
      } else {
        appleCordinate = this.getAppleCordinate();
      }
      currentSnake.push(nextX + ":" + nextY);
      this.setState(prevstate => {
        return { snake: currentSnake, direction: "+y", appleCordinate };
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
  render() {
    const boxes = [];
    const snakeActions = {
      up: this.changeDirection,
      down: this.changeDirection,
      left: this.changeDirection,
      right: this.changeDirection,
      pause: this.stopSnake,
      start: this.startSnake,
      restart: this.restartGame
    };
    const data = {
      direction: this.state.direction,
      gameOver: this.state.over
    };
    for (var y = 1; y <= 10; y++) {
      for (var x = 1; x <= 10; x++) {
        let key = x + ":" + y;
        if (key === this.state.appleCordinate) {
          boxes.push(
            <div key={key} className="box">
              <img
                src={process.env.PUBLIC_URL + "/images/apple.png"}
                width="50px"
              />
            </div>
          );
        } else if (this.state.snake.includes(key)) {
          if (key == this.getHeadOfSnake(this.state.snake)) {
            boxes.push(
              <div key={key} className="box">
                <div className="snake" style={{ backgroundColor: "red" }}>
                  {key}
                </div>
              </div>
            );
          } else {
            boxes.push(
              <div key={key} className="box">
                <div className="snake">{key}</div>
              </div>
            );
          }
        } else {
          boxes.push(
            <div key={key} className="box">
              {key}
            </div>
          );
        }
      }
    }
    return (
      <div id="gameConsole">
        <div id="game">{boxes}</div>
        <div id="control">
          <button onClick={this.stopSnake}>Stop</button>
          <ButtonActions actions={snakeActions} data={data} />
        </div>
      </div>
    );
  }
}

export default GameConsole;
