import Card from "./Card/Card";

const cards = (props) => {
  return (
    <div>
      <Card location={props.location} />
    </div>
  );
};
export default cards;
