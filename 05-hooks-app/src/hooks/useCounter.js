import { useState } from 'react';

export const useCounter = (initialValue = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const increment = (value = 1) => setCounter((current) => current + value);
  const decrement = (value = 1) => {
    const operation = counter - value;
    if (operation < 0) return;
    setCounter(operation);
  };
  const reset = () => setCounter(initialValue);

  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
