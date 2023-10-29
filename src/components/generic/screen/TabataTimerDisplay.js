import IterativeTimerDisplay from './IterativeTimerDisplay';

const TabataTimerDisplay = ({ seconds, iteration, state }) => {
  
  return (
    <IterativeTimerDisplay seconds={seconds} iteration={iteration} state={state}></IterativeTimerDisplay>
  );

  

};

export default TabataTimerDisplay;