import "./Cubes.css";

function Cubes(props) {
  console.log(props);
  const cubes = props.randomCubes.map((cubes) => {
    return <img className="cube__img" src={cubes}></img>;
  });

  return (
    <div className="cubes__container">
      {cubes}
      {/* <img className="cube__img" src={props.random1}></img>
      <img className="cube__img" src={props.random2}></img> */}
    </div>
  );
}

export default Cubes;
