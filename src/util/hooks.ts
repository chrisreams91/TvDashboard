// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// dan is a wizard
import { useEffect, useRef } from 'react';

export const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};