import { useState, useEffect, useCallback } from "react";

function useWindowScroll() {
  const [scrollPosition, setScrollPosition] = useState({
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  });

  const handleScroll = useCallback(() => {
    setScrollPosition({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return scrollPosition;
}

function App() {
  const { scrollX, scrollY } = useWindowScroll();

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        background: "white",
        padding: 10,
      }}
    >
      <p>Scroll X: {scrollX.toFixed(0)}px</p>
      <p>Scroll Y: {scrollY.toFixed(0)}px</p>
    </div>
  );
}

export default App;
