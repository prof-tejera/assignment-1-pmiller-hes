import Panel from "../generic/Panel/Panel";
import Button from "../generic/button/Button";
import Timer from "../generic/Timer";
import Input from "../generic/Input/Input";
import { useRef, useState } from "react";
import TimerDisplay from "../generic/screen/TimerDisplay";

const Countdown = () => {
    const [duration, setDuration] = useState(0);
    const clockState = useRef({hr: 0, min: 0, sec: 0});

    const OnTimerElapse = () => {
        Stop();
    }
    const OnTick = (secondsRemaining) => {
        setDuration(secondsRemaining);
    }
    const { Start, Stop, Reset } = Timer(OnTimerElapse, OnTick);

   
    // Update the duration state.
    const Update = (hr = null, min = null, sec = null) => {
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

        setDuration((( clockState.current.hr*60)*60)+(clockState.current.min*60)+ clockState.current.sec);
    };
    


    return <Panel>
        <TimerDisplay seconds={duration}></TimerDisplay>
        <Button onClick={() => Start(duration, 0, -1)} text="Start"></Button>
        <Button onClick={() => Stop()} text="Stop"></Button>
        <Button onClick={() => Reset()}  text="Reset"></Button>
        <Panel>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(e.target.value, null, null)}} placeHolder="Duration (hour)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, e.target.value, null)}} placeHolder="Duration (min)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, null, e.target.value)}} placeHolder="Duration (seconds)"></Input>
        </Panel>
    </Panel>
};

export default Countdown;
