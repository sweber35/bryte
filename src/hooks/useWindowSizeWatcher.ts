import { useState, useEffect } from "react";

/**
 * A hook for watching the size of the window.
 * @param delay the amount of time to wait before returning the height and width (defaults to 1/2 second)
 * @returns the height and width of the window.
 */
function useWindowSizeWatcher(delay = 50): { height: number; width: number } {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  let timer: any;
  const resizeHandler = () => {
    debouncedHandleResize(setDimensions, delay);
  };

  // attach the handle resize event listener to the resize event.
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  });

  function debouncedHandleResize(fn: any, waitTime: number) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, waitTime);
  }

  return dimensions;
}

export default useWindowSizeWatcher;
