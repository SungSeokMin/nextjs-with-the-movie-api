import { NextPage } from 'next';
import { UIEvent, useState } from 'react';
import { useFetchMovies } from '../api/fetchHooks';
import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from '../config';

import Link from 'next/link';

import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';
import Card from '../components/card/Card';
import Grid from '../components/grid/Grid';
import Spinner from '../components/spinner/Spinner';

type HomeProps = {};

const Home: NextPage = ({}: HomeProps) => {
  const [query, setQuery] = useState('');

  const { data, fetchNextPage, isLoading, isFetching, error } = useFetchMovies(query);

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) fetchNextPage();
  };

  return (
    <main className="relative h-screen overflow-y-scroll" onScroll={handleScroll}>
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
                <Link href={`/${movie.id}`} key={movie.id}>
                  <div className="cursor-pointer hover:opacity-80 duration-300">
                    <Card
                      imgUrl={
                        movie.poster_path
                          ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                          : '/no_image.jpg'
                      }
                      title={movie.title}
                    />
                  </div>
                </Link>
              ))
            )
          : null}
      </Grid>

      {isLoading || isFetching ? <Spinner /> : null}
    </main>
  );
};

export default Home;
