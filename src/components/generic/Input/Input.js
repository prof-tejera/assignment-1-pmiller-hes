import "./Input.css";

const Input = ({ className, placeHolder, ...props })  => {
  return <span><input className={'default-inputField '+ className} placeholder={placeHolder} {...props} /></span>;
};

export default Input;
