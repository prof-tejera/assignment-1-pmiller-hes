import { useRef } from "react";

const Timer = (onUpdated, onReset, onTimerElapse, onTick, startSeconds, endSeconds, tick) => {
    const _timer = useRef(null); 
    const _originalDuration = startSeconds;
    const _originalIteraction = useRef(0);
    const _startSeconds = startSeconds;
    const _seconds = useRef(-1);
    const _endSeconds = endSeconds;
    const _tick = tick;   
    const clockState = useRef({ on: { hr: 0, min: 0, sec: 0 }, off: { hr: 0, min: 0, sec: 0 }, iteration: 0});


    const Start = () => {
        _seconds.current = _seconds.current === -1 ? _startSeconds : _seconds.current;

        _timer.current = setInterval(() => {
            _seconds.current = _seconds.current + _tick;
            onTick(_seconds.current);
            if (_seconds.current === _endSeconds)
            {
                onTimerElapse();
            }
        }, 1000);
    };  

    // Stop the timer.
    const Stop = () => {
        //Stop the timer.
        clearInterval(_timer.current);
        //Reset the timer current to null to allow the Start to create a new timer.
        _timer.current = null;
    };

    // Stop the timer and reset the screen to all zeros.
    const Reset = (overrideSeconds = null, overrideIteration= null) => {
        _seconds.current = overrideSeconds == null ? _originalDuration : overrideSeconds;
    
        onReset(_seconds.current, overrideIteration == null ? _originalIteraction.current : overrideIteration);
    };

    // Update the duration state.
    const Update = (state = null, hr = null, min = null, sec = null, iteration = null) => {
        state = state === null ? "on" : state;

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
                    _originalIteraction.current = clockState.current.iteration;
                }
            }
        }   
        
        onUpdated(state, ((clockState.current[state].hr*60)*60)+(clockState.current[state].min*60)+ clockState.current[state].sec, clockState.current.iteration);
    };

    return { Update, Start, Stop, Reset };
}

export default Timer;
