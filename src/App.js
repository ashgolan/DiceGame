import "./App.css";
import Game from "./components/Game";
import StartPage from "./components/StartPage";
import { useState } from "react";

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
