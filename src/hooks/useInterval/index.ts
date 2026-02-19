import { useEffect } from "react";

const useInterval = (callback: () => any, delay: number | null) => {
    const tick = (): void => callback();

    useEffect(() => {
        if (delay !== null) {
            let interval = setInterval(tick, delay);

            return () => clearInterval(interval);
        }
    }, [callback, delay]);
};

export default useInterval;
