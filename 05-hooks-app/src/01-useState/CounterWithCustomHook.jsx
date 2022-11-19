import { useCounter } from '../hooks/useCounter';

export const CounterWithCustomHook = () => {
  const { counter, increment, reset, decrement } = useCounter();

  return (
    <>
      <h1>Counter With Hook: {counter}</h1>
      <hr />
      <button className="btn btn-primary" onClick={() => increment(2)}>
        +1
      </button>
      <button className="btn btn-danger" onClick={() => decrement(5)}>
        -1
      </button>
      <button className="btn btn-secondary" onClick={() => reset()}>
        Reset
      </button>
    </>
  );
};
