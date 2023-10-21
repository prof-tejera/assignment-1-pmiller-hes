import Panel from "../generic/Panel/Panel";
import Button from "../generic/button/Button";
import Timer from "../generic/Timer";
import Input from "../generic/Input/Input";
import { useReducer, useRef, useState } from "react";
import IterativeTimerDisplay from "../generic/screen/IterativeTimerDisplay";

const Tabata = () => {
    const [duration, setDuration] = useState(0);
    const onOffState = useRef('on');
    const clockState = useRef({ on: { hr: 0, min: 0, sec: 0 }, off: { hr: 0, min: 0, sec: 0 }, iteration: 0});
    const [iterations, setIterations] = useState(0);

    const OnTimerElapse = () => {
       
        clockState.current.iteration = onOffState.current === 'on' ? clockState.current.iteration : clockState.current.iteration -1;
        setIterations(clockState.current.iteration);
    
        onOffState.current = onOffState.current === 'on' ? 'off': 'on';  

        if (clockState.current.iteration > 0){
          Reset((( clockState.current[onOffState.current].hr*60)*60)+(clockState.current[onOffState.current].min*60)+ clockState.current[onOffState.current].sec);
        }
        else{
            Stop();
        }
    }
    const OnTick = (secondsRemaining) => {
        setDuration(secondsRemaining);
    }
    const { Start, Stop, Reset } = Timer(OnTimerElapse, OnTick);


    // Update the duration state.
    const Update = (state, hr = null, min = null, sec = null, iteration = null) => {
        if (hr !== null){  
            hr = hr === "" ? 0 : hr;
            if (!isNaN(hr)){
                if  (hr >= 0) {
                    clockState.current[state].hr = parseInt(hr);       
                }
            }
        }
        if (min !== null){ 
            min = min === "" ? 0 : min;
            if (!isNaN(min)){
                if  (min >= 0 && min <= 59) {
                    clockState.current[state].min = parseInt(min);  
                }
            }
        }
        if (sec !== null){  
            sec = sec === "" ? 0 : sec;
            if (!isNaN(sec)){
                if  (sec >= 0 && sec <= 59) {
                    clockState.current[state].sec = parseInt(sec);  
                }
            }
        }

        if (iteration !== null){    
            iteration = iteration === "" ? 0 : iteration;   
            if (!isNaN(iteration)){
                if  (iteration >= 0 && iteration <=100) {
                    clockState.current.iteration = parseInt(iteration);  
                }
            }
        }   

        setDuration((( clockState.current['on'].hr*60)*60)+(clockState.current['on'].min*60)+ clockState.current['on'].sec);
        setIterations(clockState.current.iteration);
    };

    return <Panel>
        <IterativeTimerDisplay seconds={duration} iteration={iterations}></IterativeTimerDisplay>
        <Button onClick={() => Start(duration, -1, -1)} text="Start"></Button>
        <Button onClick={() => Stop()} text="Stop"></Button>
        <Button onClick={() => Reset()}  text="Reset"></Button>
        <Panel>
            <h3>Time On</h3>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('on', e.target.value, null, null)}} placeHolder="Duration (hour)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('on', null, e.target.value, null)}} placeHolder="Duration (min)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('on', null, null, e.target.value)}} placeHolder="Duration (seconds)"></Input>
        </Panel>
        <Panel>
            <h3>Time Off</h3>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('off', e.target.value, null, null)}} placeHolder="Duration (hour)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('off', null, e.target.value, null)}} placeHolder="Duration (min)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('off', null, null, e.target.value)}} placeHolder="Duration (seconds)"></Input>
        </Panel>
        <Panel>
            <h3>Rounds</h3>
            <Input text="Rounds" type="number" max="999" min="0" onChange={(e) => {Update(null, null, null, null, e.target.value)}} placeHolder="Rounds"></Input>
        </Panel>
    </Panel>
};

export default Tabata;
