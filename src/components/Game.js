import React, { useState } from "react";
import Player from "./Player";
import "./Game.css";
import Actions from "./Actions";
import getCubes from "../utils/getCubes";
function Game(props) {
  const cubes = getCubes();
  const player1Name = props.details.player1Name;
  const player2Name = props.details.player2Name;
  const numberOfDices = props.details.numOfCubes;
  const target = props.details.target;
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
      isWin: "none",
      opacityStatus: 1,
      numOfWins: {},
    },
    player2: {
      name: player2Name,
      cubesPushed: [],
      current: 0,
      isPlay: true,
      total: 0,
      isWin: "none",
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
  const winner = function (totalPointsOfPlayer1, totalPointsOfPlayer2) {
    if (totalPointsOfPlayer1 > target) {
      setDataOfPlayer((p) => ({
        player1: { ...p.player1, opacityStatus: 0.5 },
        player2: {
          ...p.player2,
          opacityStatus: 1,
          isWin: "block",
        },
      }));
    } else if (totalPointsOfPlayer2 > target) {
      setDataOfPlayer((p) => ({
        player2: { ...p.player2, opacityStatus: 0.5 },
        player1: {
          ...p.player1,
          opacityStatus: 1,
          isWin: "block",
        },
      }));
    }
  };
  const restartGame = function () {
    setDataOfPlayer({
      player1: {
        name: player1Name,
        cubesPushed: [],
        current: 0,
        isPlay: true,
        total: 0,
        isWin: "none",
        opacityStatus: 1,
        numOfWins: {},
      },
      player2: {
        name: player2Name,
        cubesPushed: [],
        current: 0,
        isPlay: true,
        total: 0,
        isWin: "none",
        opacityStatus: 0.5,
        numOfWins: {},
      },
    });
  };
  const rolling = function () {
    let tempCurrent1;
    let tempCurrent2;
    if (dataOfPlayer.player1.isPlay) {
      tempCurrent1 =
        dataOfPlayer.player1.current + randomCubes.reduce((a, b) => a + b, 0);
      tempCurrent2 = dataOfPlayer.player2.current;
    } else {
      tempCurrent2 =
        dataOfPlayer.player2.current + randomCubes.reduce((a, b) => a + b, 0);
      tempCurrent1 = dataOfPlayer.player1.current;
    }
    if (!isLoading) {
      const imagesOfCubes = [];
      for (let i = 0; i < numberOfDices; i++) {
        imagesOfCubes.push(cubes[randomCubes[i]]);
      }
      // console.log(dataOfPlayer.player1.current);
      // const totalPointsOfPlayer1 = tempCurrent1 + dataOfPlayer.player1.total;
      // const totalPointsOfPlayer2 = tempCurrent2 + dataOfPlayer.player2.total;
      // if (totalPointsOfPlayer1 > target || totalPointsOfPlayer2 > target) {
      //   winner(totalPointsOfPlayer1, totalPointsOfPlayer2);
      //   return;
      // }
      if (dataOfPlayer.player1.isPlay) {
        const tempCurrent =
          dataOfPlayer.player1.current + randomCubes.reduce((a, b) => a + b, 0);
        const totalPointsOfPlayer1 = tempCurrent1 + dataOfPlayer.player1.total;
        const totalPointsOfPlayer2 = dataOfPlayer.player2.total;
        setDataOfPlayer((p) => ({
          player2: { ...p.player2 },
          player1: {
            ...p.player1,
            cubesPushed: imagesOfCubes,
            current: tempCurrent,
          },
        }));
        //check p1
        if (totalPointsOfPlayer1 > target) {
          winner(totalPointsOfPlayer1, totalPointsOfPlayer2);
          return;
        }
      } else {
        const tempCurrent =
          dataOfPlayer.player2.current + randomCubes.reduce((a, b) => a + b, 0);
        const totalPointsOfPlayer2 = tempCurrent2 + dataOfPlayer.player2.total;
        const totalPointsOfPlayer1 = dataOfPlayer.player1.total;
        setDataOfPlayer((p) => ({
          player1: { ...p.player1 },
          player2: {
            ...p.player2,
            cubesPushed: imagesOfCubes,
            current: tempCurrent,
          },
        }));
        //check p2
        if (totalPointsOfPlayer2 > target) {
          winner(totalPointsOfPlayer1, totalPointsOfPlayer2);
          return;
        }
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
        style={{
          opacity: dataOfPlayer.player1.opacityStatus,
        }}
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
        restart={restartGame}
      ></Actions>
      <Player
        style={{
          opacity: dataOfPlayer.player2.opacityStatus,
        }}
        data={dataOfPlayer.player2}
      ></Player>
    </div>
  );
}
export default Game;
