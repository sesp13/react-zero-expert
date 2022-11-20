import PropTypes from 'prop-types';
import { useLayoutEffect, useRef, useState } from 'react';

export const BreakingBadQuote = ({ author, quote }) => {
  const pRef = useRef();
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const { height, width } = pRef.current.getBoundingClientRect();
    setBoxSize({ height, width });
  }, [quote]);

  return (
    <>
      <blockquote className="blockquote text-end" style={{ display: 'flex' }}>
        <p ref={pRef} className="mb-3">
          {quote}
        </p>
        <footer className="blockquote-footer">{author}</footer>
      </blockquote>
      <code className="d-block mb-3">{JSON.stringify(boxSize)}</code>
    </>
  );
};

BreakingBadQuote.propTypes = {
  author: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
};
