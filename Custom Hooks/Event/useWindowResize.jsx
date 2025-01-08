import { useState, useEffect, useCallback } from "react";

function useWindowResize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return windowSize;
}

export default function App() {
  const { width, height } = useWindowResize();

  return (
    <div style={{ position: "fixed", top: 0, right: 0 }}>
      <h4>Window Size</h4>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}
