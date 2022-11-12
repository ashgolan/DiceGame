import React, { useState, useRef } from "react";
import Player from "./Player";
import "./Game.css";
import Actions from "./Actions";
import getCubes from "../utils/getCubes";
function Game() {
  const cubes = getCubes();
  const numberOfDices = 3;
  const maxTotal = 100;
  const player1Name = "Alaa";
  const player2Name = "Basher";
  const randomCubes = [];
  for (let i = 0; i < numberOfDices; i++) {
    const randomize = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    randomCubes.push(randomize);
  }
  const [dataOfPlayer, setDataOfPlayer] = useState({
    player1: {
      name: player1Name,
      cubesPushed: [],
      current: 0,
      isPlay: true,
      total: 0,
      opacityStatus: 1,
      numOfWins: {},
    },
    player2: {
      name: player2Name,
      cubesPushed: [],
      current: 0,
      isPlay: true,
      total: 0,
      opacityStatus: 0.5,
      numOfWins: {},
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const togglePlayer = function () {
    if (dataOfPlayer.player1.isPlay) {
      setDataOfPlayer((p) => ({
        player2: { ...p.player2, isPlay: true, opacityStatus: 1 },
        player1: {
          ...p.player1,
          cubesPushed: [],
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
          cubesPushed: [],
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
        dataOfPlayer.player1.current + dataOfPlayer.player1.total > maxTotal ||
        dataOfPlayer.player2.current + dataOfPlayer.player2.total > maxTotal
      )
        return;
      const imagesOfCubes = [];
      for (let i = 0; i < numberOfDices; i++) {
        imagesOfCubes.push(cubes[randomCubes[i]]);
      }

      if (dataOfPlayer.player1.isPlay) {
        setDataOfPlayer((p) => ({
          player2: { ...p.player2 },
          player1: {
            ...p.player1,
            cubesPushed: imagesOfCubes,
            current: p.player1.current + randomCubes.reduce((a, b) => a + b, 0),
          },
        }));
      } else {
        setDataOfPlayer((p) => ({
          player1: { ...p.player1 },
          player2: {
            ...p.player2,
            cubesPushed: imagesOfCubes,
            current: p.player2.current + randomCubes.reduce((a, b) => a + b, 0),
          },
        }));
      }
      if (randomCubes.every((number) => number === 6)) {
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
          cubesPushed: [],
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
          cubesPushed: [],
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
