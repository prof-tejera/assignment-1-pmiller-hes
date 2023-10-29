import Screen from './Screen';
import { useRef, useState, useEffect } from "react";


const TimerDisplay = ({ seconds, extendedDisplay = '', state = null}) => {
  const [style, setStyle] = useState("");
  const _timer = useRef(null); 
  const flashCount = useRef(0); 
  const formatTimeSegment = (num) => num.toString().padStart(2, '0');

  const getHours = (seconds) => {
    return Math.floor((seconds/60)/60);
  };

  const getMinutes = (seconds) => {
    return Math.floor((seconds/60)-(getHours(seconds)*60));
  }

  const getSeconds = (seconds) => {
    return Math.floor(seconds-((getMinutes(seconds)*60)+((getHours(seconds)*60)*60)));
  } 

  const preSetStyle = (state) => { 
    let className = state === null || state === "complete" ? "" : state === "on" ? "green" : "red"; 
        
    if(state === "complete"){
      _timer.current = setInterval(() => {
        flashCount.current = flashCount.current + 1;
        className = className ===  null || className === "" ? "green" : "";

        if(flashCount.current > 8) {
          clearInterval(_timer.current); 
          className = "";
        }

        setStyle(className)
      }, 800);
    }  
    else {
      clearInterval(_timer.current); 
    }

    setStyle(className)
  }

  useEffect(() => {
    preSetStyle(state);

    return () => {
      clearInterval(_timer.current);
    };
  }, [state]); 


  return (
    <Screen value={`${formatTimeSegment(getHours(seconds))}:${formatTimeSegment(getMinutes(seconds))}:${formatTimeSegment(getSeconds(seconds))}${extendedDisplay}`} style={style}></Screen>
  );



};

export default TimerDisplay;