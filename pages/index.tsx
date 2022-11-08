import { NextPage } from 'next';
import { useState } from 'react';
import { useFetchMovies } from '../api/fetchHooks';

import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';
import Card from '../components/card/Card';
import Grid from '../components/grid/Grid';
import Spinner from '../components/spinner/Spinner';

type HomeProps = {};

const Home: NextPage = ({}: HomeProps) => {
  const [query, setQuery] = useState('');

  const { data, fetchNextPage, isLoading, isFetching, error } = useFetchMovies(query);

  return (
    <main className="relative h-screen overflow-y-scroll">
      <Header />
      <Hero />
      <Grid />
      <Card />
      <Spinner />
    </main>
  );
};

export default Home;
