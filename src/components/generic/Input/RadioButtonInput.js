import "./Input.css";

const RadioButtonInput = ({ displayStyle = "radio", labelText, groupName="groupA", isActive, ...radioProps })  => {
  return <label className={isActive ? "default-"+displayStyle+"Label default-"+displayStyle+"-label-active" : "default-"+displayStyle+"Label"}>{labelText}
    <input type="radio" name={groupName} {...radioProps} />
    <span className={"default-"+displayStyle}></span>
  </label>;
};

export default RadioButtonInput;
