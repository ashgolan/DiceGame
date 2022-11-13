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

  const restartHandling = function () {
    props.restart();
  };

  return (
    <div className="actions__container">
      <button onClick={restartHandling} className="action__btn">
        NEW GAME
      </button>
      <Cubes randomCubes={props.data.cubesPushed}></Cubes>
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
