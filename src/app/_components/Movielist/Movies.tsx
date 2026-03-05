type MovieList = {
  title: string;
  img: string;
  rate: number;
  id: number;
};

const Movies = ({ img, rate, title }: MovieList) => {
  const basImgurl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="lg:h-110 lg:w-57.5 w-39.5 h-77.25 rounded-lg bg-[#f4f4f5] dark:bg-[#27272a] overflow-hidden shadow-sm">
      <img
        src={basImgurl + img}
        alt={title}
        className="rounded-t-lg lg:h-85 h-58.25 w-full object-cover"
      />

      <div className="flex gap-1 pl-2 pt-2 items-center">
        <img src="/Star.svg" alt="" className="w-4 h-4 dark:hidden" />
        <img src="/wstar.svg" alt="" className="w-4 h-4 hidden dark:flex" />
        <p className="font-medium">
          {rate.toFixed(1)} <span className="text-[#71717a]">/10</span>
        </p>
      </div>

      <p className="pl-2 font-semibold truncate">{title}</p>
    </div>
  );
};

export default Movies;
