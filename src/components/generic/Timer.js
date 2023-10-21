import { useRef } from "react";

const Timer = (onTimerElapse, onTick) => {
    const timer = useRef(null); 
    const originalDuration = useRef(0);
    const duration = useRef(0);

    const Start = (seconds, endSeconds, tick) => {
        duration.current = seconds;
        originalDuration.current = seconds;

        timer.current = setInterval(() => {
            duration.current = duration.current + tick;
            onTick(duration.current);
            if (duration.current === endSeconds)
            {
                onTimerElapse();
            }
        }, 1000);
    };  

    // Stop the timer.
    const Stop = () => {
        //Stop the timer.
        clearInterval(timer.current);
        //Reset the timer current to null to allow the Start to create a new timer.
        timer.current = null;
    };

    // Stop the timer and reset the screen to all zeros.
    const Reset = (overrideSeconds = null) => {
        duration.current =  overrideSeconds === null ? originalDuration.current : overrideSeconds;
        onTick(duration.current);
    };

    return { Start, Stop, Reset };
}

export default Timer;
