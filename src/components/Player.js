import "./Player.css";
import React from "react";
import styled from "styled-components";
const PlayerContainer = styled.div`
  background-color: #cb7f98;
`;
const winner = require("../images/winner.png");
function Player(props) {
  return (
    <PlayerContainer style={props.style} className="container__player">
      <div className="title__score">
        <h1 className="player__title">{props.data.name}</h1>
        <h3 className="total__points">{props.data.total}</h3>
      </div>
      <img
        style={{ display: props.data.isWin, width: "25%" }}
        src={winner}
      ></img>
      <div className="current__points">
        <label className="current__title">Current</label>
        <h3 className="current__points">{props.data.current}</h3>
      </div>
    </PlayerContainer>
  );
}

export default Player;
