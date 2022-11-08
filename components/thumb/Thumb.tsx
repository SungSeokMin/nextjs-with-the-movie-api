import Image from 'next/image';

type ThumbProps = {
  imgUrl: string;
};

const Thumb = ({ imgUrl }: ThumbProps) => {
  return (
    <Image
      placeholder="blur"
      blurDataURL="/placeholder.jpg"
      className="founded-lg"
      layout="fill"
      objectFit="cover"
      src={imgUrl}
      alt="thumb"
    />
  );
};

export default Thumb;
