import React, { useState } from "react";
import Player from "./Player";
import "./Game.css";
import Actions from "./Actions";
import getCubes from "../utils/getCubes";

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
      numOfWins: {},
    },
    player2: {
      name: "Player2",
      cubesPushed: [null, null],
      current: 0,
      isPlay: true,
      total: 0,
      numOfWins: {},
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const togglePlayer = function () {
    if (dataOfPlayer.player1.isPlay) {
      setDataOfPlayer((p) => ({
        player2: { ...p.player2, isPlay: true },
        player1: {
          ...p.player1,
          cubesPushed: [null, null],
          current: 0,
          isPlay: false,
        },
      }));
    } else {
      setDataOfPlayer((p) => ({
        player1: { ...p.player1, isPlay: true },
        player2: {
          ...p.player2,
          cubesPushed: [null, null],
          current: 0,
          isPlay: false,
        },
      }));
    }
  };
  const rolling = function () {
    if (!isLoading) {
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
        }, 5000);
      }
    }
  };
  const hold = () => {
    if (dataOfPlayer.player1.isPlay) {
      setDataOfPlayer((p) => ({
        player2: { ...p.player2, isPlay: true },
        player1: {
          ...p.player1,
          cubesPushed: [null, null],
          current: 0,
          isPlay: false,
          total: p.player1.current + p.player1.total,
        },
      }));
    } else {
      setDataOfPlayer((p) => ({
        player1: { ...p.player1, isPlay: true },
        player2: {
          ...p.player2,
          cubesPushed: [null, null],
          current: 0,
          isPlay: false,
          total: p.player2.current + p.player2.total,
        },
      }));
    }
  };
  return (
    <div className="game__container">
      <Player data={dataOfPlayer.player1}></Player>
      <Actions
        data={
          dataOfPlayer.player1.isPlay
            ? dataOfPlayer.player1
            : dataOfPlayer.player2
        }
        run={rolling}
        hold={hold}
      ></Actions>
      <Player data={dataOfPlayer.player2}></Player>
    </div>
  );
}
export default Game;
