import Panel from "../generic/Panel/Panel";
import Timer from "../generic/Timer";
import Input from "../generic/Input/Input";
import { useRef, useState } from "react";
import IterativeTimerDisplay from "../generic/screen/IterativeTimerDisplay";
import TimerButtons from "../generic/TimerButtons";

const XY = () => {
    const [duration, setDuration] = useState(0);
    const [iterations, setIterations] = useState(0);
    const iterationState = useRef(0);
    const seconds = useRef(0);

    const OnTimerElapse = () => {
        iterationState.current = iterationState.current -1;
        

        if (iterationState.current > 0){
            Reset(null, iterationState.current);
        }
        else{
            setDuration(0);
            setIterations(0);
            Stop();
        }

    };
    const OnTick = (secondsRemaining) => {
        setDuration(secondsRemaining);
    };    
    const OnUpdated = (state, updatedSeconds, updatedIteration) => {    
        seconds.current = updatedSeconds;
        
        setDuration(seconds.current);

        iterationState.current = updatedIteration;
        setIterations(updatedIteration);
    };
    const OnReset = (seconds, iteration) => {
        setDuration(seconds);
        setIterations(iteration);
    };
    const FastForward = () => {
        Reset(0,0);
        Stop();
    };
    const { Update, Start, Stop, Reset } = Timer(OnUpdated, OnReset, OnTimerElapse, OnTick, seconds.current, -1, -1); 

    return <Panel>
        <IterativeTimerDisplay seconds={duration} iteration={iterations}></IterativeTimerDisplay>
        <TimerButtons Start={Start} Stop={Stop} Reset={Reset} FastForward={FastForward} />
        <Panel>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, e.target.value, null, null, null)}} placeHolder="Duration (hour)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, null, e.target.value, null, null)}} placeHolder="Duration (min)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, null, null, e.target.value, null)}} placeHolder="Duration (seconds)"></Input>
            <Input text="Interations" type="number" max="100" min="1" onChange={(e) => {Update(null, null, null, null, e.target.value)}} placeHolder="Iterations"></Input>
        </Panel>
    </Panel>
};


export default XY;
