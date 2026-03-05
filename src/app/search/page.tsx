import { GenreList } from "./GenreList";
import { getGenreMoviesPlay } from "@/lib/api/genreMovies";
import { getSearchValue } from "@/lib/api/searchValue";
import Movies from "@/app/_components/Movielist/Movies";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Movie } from "@/lib/movie-data-types";

type SearchProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Search = async ({ searchParams }: SearchProps) => {
  const { genre, page, query } = await searchParams;
  const currentPage = Number(page) || 1;
  const genreIds = genre ? String(genre).split(",").filter(Boolean) : [];

  let movies: Movie[] = [];
  let totalPages = 1;
  let totalMovies = null;

  if (query && genre) {
    const data = await getSearchValue(String(query), currentPage);
    movies = data.results.filter((movie) =>
      genreIds.every((id) => movie.genre_ids.includes(Number(id))),
    );
    totalPages = data.total_pages;
    totalMovies = data.total_results;
  } else if (query) {
    const data = await getSearchValue(String(query), currentPage);
    movies = data.results;
    totalPages = data.total_pages;
    totalMovies = data.total_results;
  } else if (genre) {
    const data = await getGenreMoviesPlay(String(genre), currentPage);
    movies = data.results;
    totalPages = data.total_pages;
    totalMovies = data.total_results;
  }

  const getPageNumbers = () => {
    if (currentPage === 1) return [1, 2, 3];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set("query", String(query));
    if (genre) params.set("genre", String(genre));
    params.set("page", String(page));
    return `/search?${params.toString()}`;
  };

  const hasFilters = !!(query || genre);

  return (
    <div className="flex flex-col lg:flex-row px-5 md:px-10 lg:px-20 gap-8 w-full max-w-360 py-10">
      <GenreList />
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h1 className="font-semibold text-2xl dark:text-white">
            {query && genre
              ? `Results for "${query}" in selected genres`
              : query
                ? `Search results for "${query}"`
                : genre
                  ? "Movies by Genre"
                  : "Select a genre or search to browse movies"}
          </h1>
          {hasFilters && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {movies.length} result{movies.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
              {movies.map((movie) => (
                <Link href={`/${movie.id}`} key={movie.id}>
                  <Movies
                    img={movie.poster_path ?? ""}
                    title={movie.title}
                    rate={movie.vote_average}
                    id={movie.id}
                  />
                </Link>
              ))}
            </div>

            <Pagination className="justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="dark:text-white dark:bg-neutral-900"
                    href={currentPage > 1 ? buildPageUrl(currentPage - 1) : "#"}
                  />
                </PaginationItem>
                {getPageNumbers().map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      className="dark:text-white"
                      href={buildPageUrl(pageNumber)}
                      isActive={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    className="dark:text-white dark:bg-neutral-900"
                    href={
                      currentPage < totalPages
                        ? buildPageUrl(currentPage + 1)
                        : "#"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        ) : (
          hasFilters && <p className="dark:text-white">No movies found.</p>
        )}
      </div>
    </div>
  );
};
export default Search;
