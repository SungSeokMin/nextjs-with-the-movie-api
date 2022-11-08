import Image from 'next/image';
import { ChangeEvent, Dispatch, Fragment, SetStateAction, useRef, useState } from 'react';

type SearchInputProps = {
  setQuery: Dispatch<SetStateAction<string>>;
};

const SearchInput = ({ setQuery }: SearchInputProps) => {
  const [text, setText] = useState('');
  const timer = useRef<NodeJS.Timeout>();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    clearTimeout(timer.current);

    setText(value);

    timer.current = setTimeout(() => {
      setQuery(value);
    }, 300);
  };

  return (
    <Fragment>
      <input
        className="h-10 pr-14 md:w-96 rounded-full p-4 text-md bg-zinc-700 text-white focus:outline-none focus:border focus:border-solid focus:border-cyan-200"
        type="text"
        placeholder="Search Movie"
        value={text}
        onChange={handleInput}
      />

      <div className="absolute right-4 top-8">
        <Image width={30} height={32} src="/tmdb-logo.svg" alt="logo" />
      </div>
    </Fragment>
  );
};

export default SearchInput;
