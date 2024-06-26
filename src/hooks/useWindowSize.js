//Window Sizing custom hook
import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Set the size of the window to the state variable
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Call handle resize at load time
    handleResize();

    // Add event listener to 'listen' for when the window resizes.
    window.addEventListener("resize", handleResize);

    // Clean up function to be called to prevent memory leaks
    // Will get rid of the window event listener to stop listening for the resize event

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
