import { useCounter, useFetch } from '../hooks';
import { BreakingBadQuote } from './BreakingBadQuote';
import { LoadingQuote } from './LoadingQuote';

export const MultipleCustomHooks = () => {
  const { increment, counter } = useCounter(1);
  const { data, isLoading } = useFetch(
    `https://www.breakingbadapi.com/api/quotes/${counter}`
  );

  const { author, quote } = !!data && data[0];

  return (
    <>
      <h1>Breaking bad quotes</h1>
      <hr />
      {isLoading ? (
        <LoadingQuote />
      ) : (
        <BreakingBadQuote author={author} quote={quote} />
      )}

      <button
        className="btn btn-primary"
        disabled={isLoading}
        onClick={() => increment()}
      >
        Next quote
      </button>
    </>
  );
};
