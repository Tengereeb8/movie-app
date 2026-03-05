import { MovieDetailsType, Trailers } from "@/lib/movie-data-types";

type MovieTrailerProps = {
  movie: MovieDetailsType;
  trailers: Trailers;
};

export const MovieTrailer = ({ movie, trailers }: MovieTrailerProps) => {
  const trailer =
    trailers.results.find(
      (t) => t.site === "YouTube" && t.type === "Trailer" && t.official,
    ) ||
    trailers.results.find(
      (t) => t.site === "YouTube" && t.type === "Trailer",
    ) ||
    trailers.results.find((t) => t.site === "YouTube");

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex gap-10 px-5 lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-[24px] dark:text-white">
            {movie.title}
          </h1>
          <p className="text-sm dark:text-white">
            {movie.release_date} · PG · {movie.runtime} minute
          </p>
        </div>
        <div className="flex items-center gap-1">
          <img
            className="h-4 w-4 object-cover dark:hidden"
            src="HeroCarousel/Vector.svg"
            alt="Star review"
          />
          <img
            className="h-4 w-4 object-cover dark:flex hidden"
            src="/wstar.svg"
            alt="Star review"
          />
          <div>
            <p className="text-sm font-semibold text-[#09090B] xl:text-[14px] dark:text-[#fafafa]">
              {movie.vote_average.toFixed(1)}
              <span className="font-normal text-[#71717A]">/10</span>
            </p>
            <p className="text-[#71717A] text-xs">{movie.popularity}k</p>
          </div>
        </div>
      </div>
      <div className="flex gap-8 px-5 lg:px-0">
        <img
          className="hidden w-full max-h-107 max-w-72.5 object-cover rounded-sm lg:block"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
        />
        {trailer ? (
          <iframe
            className="w-full lg:max-w-190 aspect-video lg:rounded-sm"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&mute=0`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full lg:max-w-190 aspect-video object-cover brightness-60 lg:rounded-sm"
          />
        )}
      </div>
    </div>
  );
};
