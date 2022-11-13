import { useRef } from "react";
import "./StartPage.css";
function StartPage(props) {
  const player1Name = useRef();
  const player2Name = useRef();
  const target = useRef();
  const numOfCubes = useRef();

  const submitHandle = function (e) {
    e.preventDefault();
    props.setDetails({
      player1Name: player1Name.current.value,
      player2Name: player2Name.current.value,
      target: target.current.value,
      numOfCubes: numOfCubes.current.value,
    });
    props.setIsLoading(true);
  };
  return (
    <form onSubmit={submitHandle} className="startpage__container">
      <div className="title_input">
        <label>Player 1</label>
        <input ref={player1Name} type="text" />
      </div>

      <div className="title_input">
        <label>Player 2</label>
        <input ref={player2Name} type="text" />
      </div>
      <div className="title_input">
        <label>Target</label>
        <input ref={target} type="text" />
      </div>
      <div className="title_input">
        <label>Num Of Cubes</label>
        <input ref={numOfCubes} type="number" min="1" max="5" />
      </div>
      <button type="submit" className="submit__btn">
        Submit
      </button>
    </form>
  );
}

export default StartPage;
