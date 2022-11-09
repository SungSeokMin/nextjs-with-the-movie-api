import { basicFetch } from '../api/fetchFunctions';
import { movieUrl, creditsUrl, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Movie, Credits, Crew, Cast } from '../api/types';

import Header from '../components/header/Header';
import BreadCrumb from '../components/breadcrumb/BreadCrumb';
import MovieInfo from '../components/movieInfo/MovieInfo';
import Grid from '../components/grid/Grid';
import Card from '../components/card/Card';

type MovieProps = {
  movie: Movie;
  directors: Crew[];
  cast: Cast;
};

const Movie = ({ movie, directors, cast }: MovieProps) => {
  return (
    <main>
      <Header />

      <BreadCrumb title={movie.title} />

      <MovieInfo
        thumbUrl={
          movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : '/no_image.jpg'
        }
        rating={movie.vote_average}
        title={movie.title}
        year={movie.release_date.split('-')[0]}
        backgroundImgUrl={
          movie.backdrop_path
            ? IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path
            : '/no_image.jpg'
        }
        summary={movie.overview}
        directors={directors}
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />

      <Grid>
        <Card />
      </Grid>
    </main>
  );
};

export default Movie;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;

  const movieEndpoint = movieUrl(id);
  const creditsEndpoint = creditsUrl(id);

  const movie = await basicFetch<Movie>(movieEndpoint);
  const credits = await basicFetch<Credits>(creditsEndpoint);

  const directors = credits.crew.filter((member) => member.job === 'Director');

  return {
    props: {
      movie,
      directors,
      cast: credits.crew,
    },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
