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
      internvalId: null
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
    this.snakeInterval = null;
  }

  havingDuplicates(arr) {
    let sorted_arr = arr.slice().sort();
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results.length > 0 ? true : false;
  }

  checkColision() {
    let snakeCordinates = this.state.snake;
    if (this.havingDuplicates(snakeCordinates)) this.stopSnake();
    let headOfSnake = this.getHeadOfSnake(snakeCordinates);
    let cords = headOfSnake.split(":");
    if (parseInt(cords[0]) < 1 || parseInt(cords[1]) < 1) this.stopSnake();
    if (parseInt(cords[0]) > 10 || parseInt(cords[1]) > 10) this.stopSnake();
  }

  startSnake() {
    this.snakeInterval = setInterval(this.moveSnake, 300);
    console.log(this.snakeInterval);
  }

  changeDirection(dir) {
    this.setState(prevstate => {
      return { direction: dir };
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
    currentSnake.splice(0, 1);
    let headOfSnake = this.getHeadOfSnake(currentSnake);
    let coordinateOfHead = headOfSnake.split(":");
    let nextX = parseInt(coordinateOfHead[0]) + 1;
    let nextY = coordinateOfHead[1];
    currentSnake.push(nextX + ":" + nextY);
    this.setState(prevstate => {
      return { snake: currentSnake, direction: "+x" };
    });
  }

  moveSnakeLeft() {
    console.log("Moving : -x ");
    let currentSnake = this.state.snake;
    currentSnake.splice(0, 1);
    let headOfSnake = this.getHeadOfSnake(currentSnake);
    let coordinateOfHead = headOfSnake.split(":");
    let nextX = parseInt(coordinateOfHead[0]) - 1;
    let nextY = coordinateOfHead[1];
    currentSnake.push(nextX + ":" + nextY);
    this.setState(prevstate => {
      return { snake: currentSnake, direction: "-x" };
    });
  }
  moveSnakeUp() {
    console.log("Moving : -y ");
    let currentSnake = this.state.snake;
    currentSnake.splice(0, 1);
    let headOfSnake = this.getHeadOfSnake(currentSnake);
    let coordinateOfHead = headOfSnake.split(":");
    let nextX = coordinateOfHead[0];
    let nextY = parseInt(coordinateOfHead[1]) - 1;
    currentSnake.push(nextX + ":" + nextY);
    this.setState(prevstate => {
      return { snake: currentSnake, direction: "-y" };
    });
  }
  moveSnakeDown() {
    console.log("Moving : +y ");
    let currentSnake = this.state.snake;
    currentSnake.splice(0, 1);
    let headOfSnake = this.getHeadOfSnake(currentSnake);
    let coordinateOfHead = headOfSnake.split(":");
    let nextX = coordinateOfHead[0];
    let nextY = parseInt(coordinateOfHead[1]) + 1;
    currentSnake.push(nextX + ":" + nextY);
    this.setState(prevstate => {
      return { snake: currentSnake, direction: "+y" };
    });
  }

  stopSnake() {
    console.log("Stopping Snake : " + this.snakeInterval);
    clearInterval(this.snakeInterval._id);
  }

  componentDidMount() {
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
      direction: this.state.direction
    };
    this.checkColision(this.state.snake);
    for (var y = 1; y <= 10; y++) {
      for (var x = 1; x <= 10; x++) {
        let key = x + ":" + y;
        if (this.state.snake.includes(key)) {
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
            <div key={key} className="box" style={{ color: "white" }}>
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
          <ButtonActions actions={snakeActions} />
        </div>
      </div>
    );
  }
}

export default GameConsole;
