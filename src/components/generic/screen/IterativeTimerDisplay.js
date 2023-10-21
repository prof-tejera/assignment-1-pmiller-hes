import TimerDisplay from './TimerDisplay';

const IterativeTimerDisplay = ({ seconds, iteration }) => {
 
  const formatIteration = (iteration) => { return ` x ${iteration}`;}

  return (
    <TimerDisplay seconds={seconds} extendedDisplay={formatIteration(iteration)}></TimerDisplay>
  );

  

};

export default IterativeTimerDisplay;