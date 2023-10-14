import "./Input.css";

const CheckboxInput = ({ labelText })  => {
  return <label className="default-checkboxLabel">{labelText}
    <input type="checkbox"/>
    <span className="default-checkmark"></span>
  </label>;
};

export default CheckboxInput;
