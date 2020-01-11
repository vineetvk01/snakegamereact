import React from "react";
import "../App.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "guest"
    };
  }
  render() {
    return <div className="header"> The Snake Game</div>;
  }
}

export default Header;
