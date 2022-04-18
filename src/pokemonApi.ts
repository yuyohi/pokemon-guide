import { PokemonClient, Pokemon } from 'pokenode-ts';

const getPokemon = async (
  id: number,
  api: PokemonClient,
): Promise<Pokemon | null> => {
  try {
    const pokemon = await api.getPokemonById(id);

    return pokemon;
  } catch {
    return null;
  }
};

const api = (): PokemonClient => new PokemonClient();

export { getPokemon, api };
