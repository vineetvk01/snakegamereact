import React from "react";

class ButtonActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pause: false };
  }
  componentDidMount() {
    console.log(this.props.direction);
    document.addEventListener("keydown", event => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
      if (event.keyCode === 82 && this.props.data.gameOver) {
        this.props.actions.restart();
      }
      if (this.props.data.gameOver) return;
      if (event.keyCode === 38) {
        console.log("UP");
        if (!this.props.data.direction.includes("y")) {
          this.props.actions.up("-y");
        }
      }
      if (event.keyCode === 39) {
        console.log("RIGHT");
        if (!this.props.data.direction.includes("x")) {
          this.props.actions.right("+x");
        }
      }
      if (event.keyCode === 40) {
        console.log("DOWN");
        if (!this.props.data.direction.includes("y")) {
          this.props.actions.down("+y");
        }
      }
      if (event.keyCode === 37) {
        console.log("LEFT");
        if (!this.props.data.direction.includes("x")) {
          this.props.actions.left("-x");
        }
      }
      if (event.keyCode === 32) {
        console.log("Pause");
        if (this.state.pause) {
          this.props.actions.start();
        } else {
          this.props.actions.pause();
        }
        this.setState({ pause: !this.state.pause });
      }
    });
  }
  render() {
    let game;
    if (this.props.data.gameOver) {
      game = "GAME OVER | Press R to Restart ";
    } else if (this.state.pause) {
      game = "PAUSED";
    } else {
      game = "RUNNING ";
    }
    return (
      <div>
        <p style={{ fontSize: "20px", fontWeight: "900" }}>{game}</p>
      </div>
    );
  }
}

export default ButtonActions;
