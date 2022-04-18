import { FC, useMemo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import 'typeface-roboto';
import { PokemonClient, Pokemon, PokemonStat } from 'pokenode-ts';
import { api, getPokemon } from './pokemonApi';

/* eslint react/require-default-props: 0 */
export type PokemonId = { id?: number };
export type StatList = { stats: PokemonStat[] };

const PokemonStatList: FC<StatList> = ({ stats }) => (
  <Card sx={{ display: 'inline-block' }}>
    <List>
      {['H', 'A', 'B', 'C', 'D', 'S'].map((stat: string, index: number) => (
        <ListItem key={`${stat}list`}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip label={stat} />
            <Box component="span" width="1.5em">
              <ListItemText primary={stats[index].base_stat} />
            </Box>
            <BarChart
              margin={{ top: 9 }}
              data={[{ name: stat, stat: stats[index].base_stat }]}
              layout="vertical"
              width={150}
              height={30}
            >
              <XAxis type="number" hide />
              <YAxis type="category" hide />
              <Bar dataKey="stat" fill="#8884d8" />
            </BarChart>
          </Stack>
        </ListItem>
      ))}
    </List>
  </Card>
);

const PokemonContainer: FC<PokemonId> = () => {
  const pokemonApi: PokemonClient = useMemo(() => api(), []);
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();
  const [id, setId] = useState<number>(1);

  useEffect(() => {
    getPokemon(id, pokemonApi)
      .then((fetchPokemon) => {
        if (fetchPokemon) setPokemon(fetchPokemon);
      })
      .catch(() => setPokemon(undefined));
  }, [id, pokemonApi]);

  return (
    <Container>
      <Box component="form" pt={3}>
        <TextField
          id="outlined-required"
          label="Pokemon id"
          defaultValue="1"
          onChange={(event) => setId(Number(event.target.value))}
        />
      </Box>
      <Box
        component="img"
        src={
          pokemon?.sprites.front_default
            ? pokemon.sprites.front_default
            : undefined
        }
        alt={`pokemon No.${id}`}
      />
      <Container>
        <Typography variant="h6" sx={{ display: 'inline' }}>
          No.{id}
        </Typography>
        <Typography variant="h4" sx={{ display: 'inline' }}>
          {' '}
        </Typography>
        <Typography variant="h4" sx={{ display: 'inline' }}>
          {pokemon?.name}
        </Typography>
      </Container>
      {pokemon ? <PokemonStatList stats={pokemon.stats} /> : null}
    </Container>
  );
};

export default PokemonContainer;
