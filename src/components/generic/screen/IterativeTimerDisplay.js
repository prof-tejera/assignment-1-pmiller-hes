import TimerDisplay from './TimerDisplay';

const IterativeTimerDisplay = ({ seconds, iteration, state }) => {
 
  const formatIteration = (iterations) => { return ` x ${iterations}`;}

  return (
    <TimerDisplay seconds={seconds} extendedDisplay={formatIteration(iteration)} state={state}></TimerDisplay>
  );

  

};

export default IterativeTimerDisplay;