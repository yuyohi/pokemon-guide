import { PokemonClient, Pokemon } from 'pokenode-ts';
import * as TE from 'fp-ts/TaskEither';

const getPokemon = (
  id: number,
  api: PokemonClient,
): TE.TaskEither<Error, Pokemon> =>
  TE.tryCatch(
    () => api.getPokemonById(id).then((value: Pokemon) => value),
    (e) => new Error(`${e as string}`),
  );

const api = (): PokemonClient => new PokemonClient();

export { getPokemon, api };
