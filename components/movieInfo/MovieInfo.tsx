import Image from 'next/image';

import { calcTime, convertMoney } from '../../helpers';
import { Crew } from '../../api/types';

import Thumb from '../thumb/Thumb';

type MovieInfoProps = {
  thumbUrl: string;
  backgroundImgUrl: string;
  title: string;
  year: string;
  summary: string;
  rating: number;
  directors: Crew[];
  time: number;
  budget: number;
  revenue: number;
};

const MovieInfo = ({
  backgroundImgUrl,
  budget,
  directors,
  rating,
  revenue,
  summary,
  thumbUrl,
  time,
  title,
  year,
}: MovieInfoProps) => {
  return (
    <div className="relative w-full h-auto p-4">
      <div className="relative h-full min-h-128 flex flex-col md:flex-row max-w-7xl p-4 m-auto z-10 rounded-xl bg-zinc-800 bg-opacity-90">
        <div className="relative w-full h-96 md:h-auto md:w-1/3">
          <Thumb imgUrl={thumbUrl} />
          <div className="absolute top-4 left-4 rounded-full bg-white w-10 h-10 flex justify-center items-center text-black text-sm font-bold">
            {rating}
          </div>
        </div>
        <div className="text-white px-0 py-4 md:py-0 text-center md:text-left md:px-8 w-full md:w-2/3">
          <h2 className="text-2xl md:text-4xl font-bold pb-4">
            {title} ({year})
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
