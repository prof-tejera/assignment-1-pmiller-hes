import "./Input.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'



const EmailInput =({ className, placeHolder, ...props }) => {
    return <span>
        <input className={'default-inputField '+ className} type="emal" placeholder={placeHolder}></input>
        <FontAwesomeIcon className="default-inputIcon" icon={faEnvelope} />
    </span>;
  };
  
  export default EmailInput;
  