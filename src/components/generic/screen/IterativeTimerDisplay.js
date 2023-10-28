import TimerDisplay from './TimerDisplay';

const IterativeTimerDisplay = ({ seconds, iteration }) => {
 
  const formatIteration = (iterations) => { return ` x ${iterations}`;}

  return (
    <TimerDisplay seconds={seconds} extendedDisplay={formatIteration(iteration)}></TimerDisplay>
  );

  

};

export default IterativeTimerDisplay;