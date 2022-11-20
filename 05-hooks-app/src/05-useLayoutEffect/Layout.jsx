import { useCounter, useFetch } from '../hooks';
import { BreakingBadQuote } from '../03-examples/BreakingBadQuote';
import { LoadingQuote } from '../03-examples/LoadingQuote';

export const Layout = () => {
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
