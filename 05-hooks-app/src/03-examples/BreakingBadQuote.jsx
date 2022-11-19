import PropTypes from 'prop-types';

export const BreakingBadQuote = ({ author, quote }) => {
  return (
    <blockquote className="blockquote text-end">
      <p className="mb-3">{quote}</p>
      <footer className="blockquote-footer">{author}</footer>
    </blockquote>
  );
};

BreakingBadQuote.propTypes = {
  author: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
};
