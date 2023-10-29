import React, { useRef, useState } from "react";
import Button from "../generic/button/Button";


const TimerButtons =  ({ Start, Stop, Reset, FastForward })  => {
    const [buttonStateText, setButtonSetText] = useState("Start");
    const [activeState, setActiveState] = useState(false);
    const buttonState = useRef(0);


    const ToggleButton = () => {
        if (buttonState.current === 0){
            Start();
            buttonState.current = 1;
            setButtonSetText("Pause");
            setActiveState(true);
        }
        else if (buttonState.current === 1){
            Stop();
            buttonState.current = 2;
            setButtonSetText("Resume");
            setActiveState(false);
        }
        else {
            Start();
            buttonState.current = 1;
            setButtonSetText("Pause");
            setActiveState(true);
        }
    };

    const ToggleResetButton = () => {
        Reset();
        buttonState.current = 0;
        setButtonSetText("Start");
        setActiveState(false);
    };

    const ToggleFastForward = () =>
    {
        FastForward();
        buttonState.current = 0;
        setButtonSetText("Start");
        setActiveState(false);
    }

    return (
        <div>
            <Button onClick={() => ToggleButton()} text={buttonStateText} active={activeState}></Button>
            <Button onClick={() => ToggleResetButton()}  text="Reset"></Button>
            <Button onClick={() => ToggleFastForward()}  text="Fast Forward"></Button>
        </div>    
    );
};

export default TimerButtons;

