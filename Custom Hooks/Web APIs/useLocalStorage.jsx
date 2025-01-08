import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error(`Error writing localStorage key “${key}”:`, err);
    }
  }, [key, storedValue]);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (err) {
      console.error(`Error setting localStorage key “${key}”:`, err);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}

function LocalStorageExample() {
  const [name, setName, removeName] = useLocalStorage("name", "John Doe");

  return (
    <div>
      <h2>Local Storage Example</h2>
      <p>Stored Name: {name}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={removeName}>Remove Name</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Using useLocalStorage Hook</h1>
      <LocalStorageExample />
    </div>
  );
}
