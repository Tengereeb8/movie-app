import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Movie, Trailers } from "@/lib/movie-data-types";
import { getMovieTrailers } from "@/lib/api";
import HeroSlide from "./HeroSlide";

type HeroCarouselProps = {
  movies: Movie[];
};

const HeroCarousel = async ({ movies }: HeroCarouselProps) => {
  const theMovies = movies.slice(16, 19);
  const trailersPerMovie: Trailers[] = await Promise.all(
    theMovies.map((movie) => getMovieTrailers(movie.id.toString())),
  );

  return (
    <div className="min-h-93.75 w-full lg:max-w-360 overflow-hidden mb-12 relative">
      <Carousel className="min-w-93.75 w-full">
        <CarouselNext className="hidden absolute w-10 h-10 right-[3%] z-30 cursor-pointer lg:flex" />
        <CarouselContent>
          {theMovies.map((movie, index) => (
            <CarouselItem key={movie.id}>
              <HeroSlide movie={movie} trailers={trailersPerMovie[index]} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden absolute w-10 h-10 left-[3%] z-40 cursor-pointer lg:flex" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
