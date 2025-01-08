import { useState, useCallback } from "react";

function useToggle(on) {
  const [isToggled, setIsToggled] = useState(on);

  const toggle = useCallback(() => {
    setIsToggled((t) => !t);
  }, []);

  return [isToggled, toggle];
}

/* Usage example */
export default function App() {
  const [isToggled, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Click to see</button>
      {isToggled && <div>There is a hidden content</div>}
    </div>
  );
}
