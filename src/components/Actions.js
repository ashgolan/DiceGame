import React, { useState } from "react";
import Cubes from "./Cubes";
import "./Actions.css";

function Actions(props) {
  const rolling = function () {
    props.run();
  };

  const holding = function () {
    props.hold();
  };

  return (
    <div className="actions__container">
      <button className="action__btn">NEW GAME</button>
      <Cubes
        random1={props.data.cubesPushed[0]}
        random2={props.data.cubesPushed[1]}
      ></Cubes>
      <button onClick={rolling} className="action__btn">
        ROLL DICE
      </button>
      <button onClick={holding} className="action__btn">
        HOLD
      </button>
    </div>
  );
}

export default Actions;
