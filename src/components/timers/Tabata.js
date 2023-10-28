import Panel from "../generic/Panel/Panel";
import Timer from "../generic/Timer";
import Input from "../generic/Input/Input";
import { useRef, useState } from "react";
import IterativeTimerDisplay from "../generic/screen/IterativeTimerDisplay";
import TimerButtons from "../generic/TimerButtons";

const Tabata = () => {
    const [duration, setDuration] = useState(0);
    const [iterations, setIterations] = useState(0);
    const iterationState = useRef(0);
    const onOffState = useRef('on');
    const onSeconds = useRef(0);
    const offSeconds = useRef(0);

    const OnTimerElapse = () => {       
        if (onOffState.current === 'on') {
            onOffState.current = 'off';
        } else {
            iterationState.current = iterationState.current -1;
           onOffState.current = 'on';
        }
    
        if (iterationState.current > 0) {
            Reset(onOffState.current === 'off' ? offSeconds.current : onSeconds.current, iterationState.current);
        } else {
            setDuration(0);
            setIterations(0);
            Stop();
        }
    };
    const OnTick = (secondsRemaining) => {
        setDuration(secondsRemaining);
    };
    const OnUpdated = (state, updatedSeconds, updatedIteration) => {
        if (state === "on") {
            onSeconds.current = updatedSeconds;
            setDuration(onSeconds.current);
        }
        else
        {
            offSeconds.current = updatedSeconds;
        }
        iterationState.current = updatedIteration;
        setIterations(updatedIteration);
    };
    const OnReset = (seconds, iteration) => {
        setDuration(seconds);
        setIterations(iteration);
    };
    const FastForward = () => {
        Reset(0, 0);
        Stop();
    };
    const { Update, Start, Stop, Reset } = Timer(OnUpdated, OnReset, OnTimerElapse, OnTick, onSeconds.current, -1, -1);

    return <Panel>
        <IterativeTimerDisplay seconds={duration} iteration={iterations}></IterativeTimerDisplay>
        <TimerButtons Start={Start} Stop={Stop} Reset={Reset} FastForward={FastForward} />
        <Panel>
            <h3>Time On</h3>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('on', e.target.value, null, null, null)}} placeHolder="Duration (hour)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('on', null, e.target.value, null, null)}} placeHolder="Duration (min)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('on', null, null, e.target.value, null)}} placeHolder="Duration (seconds)"></Input>
        </Panel>
        <Panel>
            <h3>Time Off</h3>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('off', e.target.value, null, null, null)}} placeHolder="Duration (hour)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('off', null, e.target.value, null, null)}} placeHolder="Duration (min)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update('off', null, null, e.target.value, null)}} placeHolder="Duration (seconds)"></Input>
        </Panel>
        <Panel>
            <h3>Rounds</h3>
            <Input text="Rounds" type="number" max="999" min="0" onChange={(e) => {Update(null, null, null, null, e.target.value)}} placeHolder="Rounds"></Input>
        </Panel>
    </Panel>
};

export default Tabata;
