import { useRef } from 'react';

export const FocusScreen = () => {
  const inputRef = useRef();

  const setFocus = () => {
    console.log(inputRef);
    inputRef.current.select();
  };

  return (
    <>
      <h1>Focus screen</h1>
      <hr />
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Your name"
      />
      <button className="btn btn-primary mt-2" onClick={setFocus}>
        Set Focus
      </button>
    </>
  );
};
