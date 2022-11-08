import { NextPage } from 'next';
import { useState } from 'react';
import { useFetchMovies } from '../api/fetchHooks';
import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from '../config';

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
      <Header setQuery={setQuery} />

      {!query && data && data.pages ? (
        <Hero
          imgUrl={
            data.pages[0].results[0].backdrop_path
              ? IMAGE_BASE_URL + BACKDROP_SIZE + data.pages[0].results[0].backdrop_path
              : '/no_image.jpg'
          }
          title={data.pages[0].results[0].title}
          text={data.pages[0].results[0].overview}
        />
      ) : null}

      <Grid
        className="p-4 max-w-7xl m-auto"
        title={query ? `Search Results: ${data?.pages[0].total_results}` : 'Popular Movies'}
      >
        {data && data.pages
          ? data.pages.map((page) =>
              page.results.map((movie) => (
                <div key={movie.id}>
                  <Card
                    imgUrl={
                      movie.poster_path
                        ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                        : '/no_image.jpg'
                    }
                    title={movie.title}
                  />
                </div>
              ))
            )
          : null}
      </Grid>

      <Spinner />
    </main>
  );
};

export default Home;
