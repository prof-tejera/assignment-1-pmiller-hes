import Panel from "../generic/Panel/Panel";
import Button from "../generic/button/Button";
import Screen from "../generic/screen/Screen";
import Input from "../generic/Input/Input";
import { useState, useRef } from "react";

const Countdown = () => {
    const [watch, setWatch] = useState('00:00:00');
    const duration = useRef({hr: 0, min: 0, sec: 0});

    // Hold the reference to the timer so the timer can be stopped.
    const timer = useRef(null); 

    // Simple function to help format the time segments to a 00 format.
    const formatTimeSegment = (num) => num.toString().padStart(2, '0');
    const tick = -1;
    const rollOver = 59;
    const end = 0;

    // Start the timer.
    const Start = () => {
        // If the timer has already been started, then do not start a new one. 
        if( timer.current !== null){
            return;
        }

        timer.current = setInterval(() => {
            if (duration.current.sec === end) {
                if (duration.current.min === end) {
                    if (duration.current.hr === end) {
                        Stop();
                        return;
                    } else {
                        duration.current.hr += tick;
                        duration.current.min = rollOver;
                    }
                } else {
                    duration.current.min += tick;
                }
                duration.current.sec = rollOver;
            } else {
                duration.current.sec += tick;
            }
            // Redraw the screen
            Set()

        }, 1000);
    };  

    // Stop the timer.
    const Stop = () => {
        //Stop the timer.
        clearInterval(timer.current);
        //Reset the timer current to null to allow the Start to create a new timer.
        timer.current = null;
    };

    // Update the Screen
    const Set = () => {
        const { hr, min, sec } = duration.current;

        setWatch(`${formatTimeSegment(hr)}:${formatTimeSegment(min)}:${formatTimeSegment(sec)}`);
        
    }

    // Stop the timer and reset the screen to all zeros.
    const Reset = () => {
        Stop();
        duration.current = { hr: 0, min: 0, sec: 0 };
        Set();
    };

    // Update the duration state.
    const Update = (hr = null, min = null, sec = null) => {
        if (hr !== null){      
            if (!isNaN(hr)){
                if  (hr >= 0 && hr <= 59) {
                    duration.current.hr = parseInt(hr);
                }
            }
        }
        if (min !== null){ 
            if (!isNaN(min)){
                if  (min >= 0 && min <= 59) {
                    duration.current.min = parseInt(min);
                }
            }
        }
        if (sec !== null){       
            if (!isNaN(sec)){
                if  (sec >= 0 && sec <= 59) {
                    duration.current.sec = parseInt(sec);
                }
            }
        }
    };
    


    return <Panel>
        <Screen value={watch}></Screen>
        <Button onClick={() => Start()} text="Start"></Button>
        <Button onClick={() => Stop()} text="Stop"></Button>
        <Button onClick={() => Reset()}  text="Reset"></Button>
        <Panel>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(e.target.value, null, null)}} placeHolder="Duration (hour)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, e.target.value, null)}} placeHolder="Duration (min)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, null, e.target.value)}} placeHolder="Duration (seconds)"></Input>
            <Button text="Set" onClick={ () => {Set()}}></Button>
        </Panel>
    </Panel>
};

export default Countdown;
