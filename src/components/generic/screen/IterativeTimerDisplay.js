import TimerDisplay from './TimerDisplay';

const IterativeTimerDisplay = ({ seconds, iteration, style }) => {
 
  const formatIteration = (iterations) => { return ` x ${iterations}`;}

  return (
    <TimerDisplay seconds={seconds} extendedDisplay={formatIteration(iteration)} style={style}></TimerDisplay>
  );

  

};

export default IterativeTimerDisplay;