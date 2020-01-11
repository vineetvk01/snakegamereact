import React from "react";
import "../App.css";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Guest"
    };
  }

  handleChange = event => {
    console.log(event);
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      user: event.target.value
    });
  };

  onSubmit = event => {
    let user = this.state.user;
    this.props.onClick(user, 0);
  };
  render() {
    return (
      <div className="welcome">
        <div className="controls">
          <p>Keys : </p>
          <p style={{ fontSize: "2.4em" }}>
            {" "}
            ← ↑ → ↓ <br />
            <br />
            [space] <span style={{ fontSize: "0.5em" }}>Pause/Play</span> <br />
            <br />
            [R]
            <span style={{ fontSize: "0.5em" }}>Reload</span>
          </p>
        </div>
        <div className="scores">
          <p>
            Last Score : <br />
            <br />
            <img
              src={process.env.PUBLIC_URL + "/images/apple.png"}
              width="50px"
              alt="Apple Pic"
            />
            <span style={{ fontSize: "50px" }}>
              {" "}
              {this.props.lastScore.score}{" "}
            </span>{" "}
            points by <u>{this.props.lastScore.by}</u>
          </p>

          <p>
            Highest Score : <br />
            <br />
            <img
              src={process.env.PUBLIC_URL + "/images/prize.png"}
              width="50px"
              alt="Apple Pic"
            />
            <span style={{ fontSize: "50px" }}>
              {" "}
              {this.props.highest.score}{" "}
            </span>{" "}
            points by <u>{this.props.highest.by}</u>
          </p>
          <p>Your Name: </p>
          <input
            name="guestName"
            value={this.state.user}
            onChange={this.handleChange}
            placeholder="Guest"
            id="nameCapture"
          ></input>
          <button onClick={this.onSubmit} id="start">
            Start !
          </button>
        </div>
      </div>
    );
  }
}

export default Welcome;
