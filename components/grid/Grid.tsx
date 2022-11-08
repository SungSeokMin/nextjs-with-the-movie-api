import { ReactNode } from 'react';

type GridProps = {
  title: string;
  className?: string;
  children: ReactNode;
};

const Grid = ({ title, className, children }: GridProps) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-bold pb-4">{title}</h2>

      <div className="grid grid-cols-auto-fill gap-8">{children}</div>
    </div>
  );
};

export default Grid;
