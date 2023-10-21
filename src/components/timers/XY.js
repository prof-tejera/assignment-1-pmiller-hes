import Panel from "../generic/Panel/Panel";
import Button from "../generic/button/Button";
import Timer from "../generic/Timer";
import Input from "../generic/Input/Input";
import { useRef, useState } from "react";
import IterativeTimerDisplay from "../generic/screen/IterativeTimerDisplay";

const XY = () => {
    const [duration, setDuration] = useState(0);
    const clockState = useRef({hr: 0, min: 0, sec: 0, iteration: 0});
    const [iterations, setIterations] = useState(0);

    const OnTimerElapse = () => {
        clockState.current.iteration = clockState.current.iteration -1;
        setIterations(clockState.current.iteration);
        setDuration(0);

        if (clockState.current.iteration > 0){
            Reset();
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
    const Update = (hr = null, min = null, sec = null, iteration = null) => {
        if (hr !== null){  
            hr = hr === "" ? 0 : hr;
            if (!isNaN(hr)){
                if  (hr >= 0) {
                    clockState.current.hr = parseInt(hr);       
                }
            }
        }
        if (min !== null){ 
            min = min === "" ? 0 : min;
            if (!isNaN(min)){
                if  (min >= 0 && min <= 59) {
                    clockState.current.min = parseInt(min);  
                }
            }
        }
        if (sec !== null){  
            sec = sec === "" ? 0 : sec;
            if (!isNaN(sec)){
                if  (sec >= 0 && sec <= 59) {
                    clockState.current.sec = parseInt(sec);  
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

        setDuration((( clockState.current.hr*60)*60)+(clockState.current.min*60)+ clockState.current.sec);
        setIterations(clockState.current.iteration);
    };


    return <Panel>
        <IterativeTimerDisplay seconds={duration} iteration={iterations}></IterativeTimerDisplay>
        <Button onClick={() => Start(duration, -1, -1)} text="Start"></Button>
        <Button onClick={() => Stop()} text="Stop"></Button>
        <Button onClick={() => Reset()}  text="Reset"></Button>
        <Panel>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(e.target.value, null, null, null)}} placeHolder="Duration (hour)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, e.target.value, null, null)}} placeHolder="Duration (min)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, null, e.target.value, null)}} placeHolder="Duration (seconds)"></Input>
            <Input text="Interations" type="number" max="100" min="1" onChange={(e) => {Update(null, null, null, e.target.value)}} placeHolder="Iterations"></Input>
        </Panel>
    </Panel>
};


export default XY;
