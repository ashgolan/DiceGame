import "./Cubes.css";

function Cubes(props) {
  const cubes = props.randomCubes.map((cubes, index) => {
    return <img key={`c${index}`} className="cube__img" src={cubes}></img>;
  });

  return <div className="cubes__container">{cubes}</div>;
}

export default Cubes;
