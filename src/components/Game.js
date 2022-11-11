import React, { useState, useRef } from "react";
import Player from "./Player";
import "./Game.css";
import Actions from "./Actions";
import getCubes from "../utils/getCubes";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";

function Game() {
  const cubes = getCubes();
  const randomize1 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  const randomize2 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  const [dataOfPlayer, setDataOfPlayer] = useState({
    player1: {
      name: "Player1",
      cubesPushed: [null, null],
      current: 0,
      isPlay: true,
      total: 0,
      opacityStatus: 1,
      numOfWins: {},
    },
    player2: {
      name: "Player2",
      cubesPushed: [null, null],
      current: 0,
      isPlay: true,
      total: 0,
      opacityStatus: 0.5,
      numOfWins: {},
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [styles, setStyles] = useState({
    backgroundColorLose: "black",
  });

  const togglePlayer = function () {
    if (dataOfPlayer.player1.isPlay) {
      setDataOfPlayer((p) => ({
        player2: { ...p.player2, isPlay: true, opacityStatus: 1 },
        player1: {
          ...p.player1,
          cubesPushed: [null, null],
          current: 0,
          isPlay: false,
          opacityStatus: 0.5,
        },
      }));
    } else {
      setDataOfPlayer((p) => ({
        player1: { ...p.player1, isPlay: true, opacityStatus: 1 },
        player2: {
          ...p.player2,
          cubesPushed: [null, null],
          current: 0,
          isPlay: false,
          opacityStatus: 0.5,
        },
      }));
    }
  };
  const rolling = function () {
    if (!isLoading) {
      if (
        dataOfPlayer.player1.current + dataOfPlayer.player1.total > 100 ||
        dataOfPlayer.player2.current + dataOfPlayer.player2.total > 100
      )
        return;
      const random1 = cubes[randomize1];
      const random2 = cubes[randomize2];
      if (dataOfPlayer.player1.isPlay) {
        setDataOfPlayer((p) => ({
          player2: { ...p.player2 },
          player1: {
            ...p.player1,
            cubesPushed: [random1, random2],
            current: p.player1.current + randomize1 + randomize2,
          },
        }));
      } else {
        setDataOfPlayer((p) => ({
          player1: { ...p.player1 },
          player2: {
            ...p.player2,
            cubesPushed: [random1, random2],
            current: p.player2.current + randomize1 + randomize2,
          },
        }));
      }
      if (randomize1 === 6 && randomize2 === 6) {
        setIsLoading((lo) => (lo = true));
        setTimeout(() => {
          togglePlayer();
          setIsLoading((lo) => (lo = false));
        }, 1000);
      }
    }
  };
  const hold = () => {
    if (dataOfPlayer.player1.isPlay) {
      setDataOfPlayer((p) => ({
        player2: { ...p.player2, isPlay: true, opacityStatus: 1 },
        player1: {
          ...p.player1,
          cubesPushed: [null, null],
          current: 0,
          isPlay: false,
          opacityStatus: 0.5,
          total: p.player1.current + p.player1.total,
        },
      }));
    } else {
      setDataOfPlayer((p) => ({
        player1: { ...p.player1, isPlay: true, opacityStatus: 1 },
        player2: {
          ...p.player2,
          cubesPushed: [null, null],
          current: 0,
          isPlay: false,
          opacityStatus: 0.5,
          total: p.player2.current + p.player2.total,
        },
      }));
    }
  };
  return (
    <div className="game__container">
      <Player
        style={{ opacity: dataOfPlayer.player1.opacityStatus }}
        data={dataOfPlayer.player1}
      ></Player>
      <Actions
        data={
          dataOfPlayer.player1.isPlay
            ? dataOfPlayer.player1
            : dataOfPlayer.player2
        }
        run={rolling}
        hold={hold}
      ></Actions>
      <Player
        style={{ opacity: dataOfPlayer.player2.opacityStatus }}
        data={dataOfPlayer.player2}
      ></Player>
    </div>
  );
}
export default Game;
