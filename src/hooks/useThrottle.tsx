import { useState, useRef } from "react";

function useThrottle(cb: () => {}, limit: number) {
  const lastRun = useRef(Date.now());

  return function () {
    if (Date.now() - lastRun.current >= limit) {
      cb();
      lastRun.current = Date.now();
    }
  };
}

export default useThrottle;

//throttle is used for listening to the events such as resizing and scroll events
