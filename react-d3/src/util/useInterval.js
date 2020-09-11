import { useRef, useEffect } from "react";

function useInterval(callback, delay) {
    const savedCallback = useRef();
    
    useEffect(() => { // remember the last callback
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => { // set up the interval
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default useInterval;