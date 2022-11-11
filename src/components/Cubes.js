import "./Cubes.css";

function Cubes(props) {
  return (
    <div className="cubes__container">
      <img className="cube__img" src={props.random1}></img>
      <img className="cube__img" src={props.random2}></img>
    </div>
  );
}

export default Cubes;
