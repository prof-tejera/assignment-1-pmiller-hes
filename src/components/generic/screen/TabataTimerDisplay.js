import IterativeTimerDisplay from './IterativeTimerDisplay';

const TabataTimerDisplay = ({ seconds, iteration, state }) => {
 
  const setStyle = (state) => { return state === "on" ? "green" : "red"; }

  return (
    <IterativeTimerDisplay seconds={seconds} iteration={iteration} style={setStyle(state)}></IterativeTimerDisplay>
  );

  

};

export default TabataTimerDisplay;