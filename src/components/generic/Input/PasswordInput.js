import "./Input.css";
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'


const PasswordInput =({ className, placeHolder, ...props })  => {
    const [passEyeIcon, setPassEyeIcon] = useState(faEyeSlash);
    const [passInputType, setPassCInputTypet] = useState("password");

    const handlePassInputClick = () => {
        setPassCInputTypet(passInputType === "text"? "password": "text");
        passInputType === "text" ? setPassEyeIcon(faEye) : setPassEyeIcon(faEyeSlash);
      };

    return <span>
        <input className={'default-inputField '+ className} type={passInputType} placeholder={placeHolder}></input>
        <FontAwesomeIcon className="default-inputIcon" icon={faLock} />
        <FontAwesomeIcon className="default-passEyeIcon" icon={passEyeIcon} onClick={handlePassInputClick} />
    </span>;
  };
  
  export default PasswordInput;
  