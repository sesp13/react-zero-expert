import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, startLoadingPokemons } from './store/slices/pokemon';

export const PokemonApp = () => {
  const dispatch = useDispatch();
  const { page, pokemons, isLoading } = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <>
      <h1>PokemonApp</h1>
      <hr />
      <span>Is loading: {isLoading ? 'true' : 'false'}</span>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      <button disabled={isLoading} onClick={() => dispatch(getPokemons(page))}>Next</button>
    </>
  );
};
