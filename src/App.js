import logo from "./logo.svg";
import "./App.css";
import Game from "./components/Game";
import styled from "styled-components";
import StartPage from "./components/StartPage";
import { useState, useRef } from "react";

function App() {
  const [details, setDetails] = useState({
    player1Name: "",
    player2Name: "",
    target: null,
    numOfCubes: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {isLoading && <Game details={details}></Game>}
      {!isLoading && (
        <StartPage
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          {...details}
          setDetails={setDetails}
        ></StartPage>
      )}
    </div>
  );
}

export default App;
