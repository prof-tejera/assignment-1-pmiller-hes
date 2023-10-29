import "./Screen.css";

const Screen = ({ value, style ='' }) => {
  return (
    <div className={'screen '+ style} >
      {value}
    </div>
  );
};

export default Screen;
