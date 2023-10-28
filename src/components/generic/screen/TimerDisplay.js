import Screen from './Screen';

const TimerDisplay = ({ seconds, extendedDisplay = '', style = ''}) => {
 
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


  return (
    <Screen value={`${formatTimeSegment(getHours(seconds))}:${formatTimeSegment(getMinutes(seconds))}:${formatTimeSegment(getSeconds(seconds))}${extendedDisplay}`} style={style}></Screen>
  );



};

export default TimerDisplay;