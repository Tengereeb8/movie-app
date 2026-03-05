"use client";
import {
  ChangeEventHandler,
  useEffect,
  useState,
  useRef,
  Suspense,
} from "react";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";

import Logo from "@/components/ui/Logo";
import { DesktopSearch } from "./DesktopSearch";
import { NavigationButtons } from "./NavigationButtons";
import Link from "next/link";
import { Movie } from "@/lib/movie-data-types";
import { getSearchValue } from "@/lib/api";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";

const NavigationContent = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [movieResults, setMovieResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchActive(false);
        setMovieResults([]);
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchValue === "") {
      setMovieResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const data = await getSearchValue(searchValue);
      setMovieResults(data.results);
      setShowResults(true);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const search = () => {
    setSearchActive(true);
  };

  const closeSearch = () => {
    setSearchActive(false);
  };

  const buildSeeAllUrl = () => {
    const params = new URLSearchParams();
    params.set("query", searchValue);
    const genre = searchParams.get("genre");
    if (genre) params.set("genre", genre);
    return `/search?${params.toString()}`;
  };

  const moviesToDisplay = movieResults;

  return (
    <div className="w-full max-w-7xl h-14.75 flex justify-between items-center px-5 md:mb-3 lg:p-0 relative">
      <Link className={searchActive ? "hidden" : "block"} href="/">
        <Logo />
      </Link>

      <div
        ref={searchRef}
        className={
          searchActive
            ? `gap-3 h-12 items-center w-full flex justify-between lg:flex relative`
            : `gap-3 h-12 items-center hidden lg:flex relative`
        }
      >
        <DesktopSearch searchActive={searchActive} />
        <InputGroup className="w-50 md:w-65 lg:w-100">
          <InputGroupInput
            onChange={onChangeInput}
            value={searchValue}
            className="dark:text-white"
            placeholder="Search..."
          />
        </InputGroup>
        <X className="dark:text-white lg:hidden" onClick={closeSearch} />
        <div
          className={`${showResults ? "" : "hidden"} dark:bg-[#09090B] p-3 dark:border-[#27272A] rounded-lg border flex flex-col bg-white w-[80vw] h-fit absolute lg:w-144.25 left-1/5 top-full z-10`}
        >
          {moviesToDisplay.length !== 0 ? (
            <div>
              {loading ? (
                <p className="dark:text-white text-center p-10">...Loading</p>
              ) : (
                moviesToDisplay.slice(0, 5).map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/${movie.id}`}
                    onClick={() => {
                      setShowResults(false);
                    }}
                  >
                    <div>
                      <div className="p-2 flex gap-4 h-29 dark:hover:bg-neutral-900 hover:bg-neutral-200 transition-colors duration-200 ease-out cursor-pointer rounded-sm">
                        <img
                          className="h-25 w-17 rounded-md"
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          alt="movie"
                        />
                        <div className="flex flex-col gap-3">
                          <div>
                            <h1 className="font-semibold text-xl dark:text-white">
                              {movie.title}
                            </h1>
                            <div className="flex items-center gap-1">
                              <img
                                className="h-4 w-4 object-cover dark:hidden"
                                src="/HeroCarousel/Vector.svg"
                                alt="Star review"
                              />
                              <img
                                className="h-4 w-4 object-cover dark:flex hidden"
                                src="/wstar.svg"
                                alt="Star review"
                              />
                              <p className="text-[12px] font-medium text-[#09090B] xl:text-[14px] dark:text-[#fafafa]">
                                {movie.vote_average.toFixed(1)}
                                <span className="font-normal text-[#71717A]">
                                  /10
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-px my-2.5 bg-[#E4E4E7] dark:bg-[#27272A]"></div>
                    </div>
                  </Link>
                ))
              )}
              <Link
                href={buildSeeAllUrl()}
                onClick={() => {
                  setShowResults(false);
                }}
              >
                <h3 className="font-medium cursor-pointer text-sm dark:text-white py-2 px-4 rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-900">
                  See all results for "{searchValue}"
                </h3>
              </Link>
            </div>
          ) : (
            <div className="dark:text-white text-base h-23.75 flex justify-center items-center">
              {loading ? "Loading..." : "No results found"}
            </div>
          )}
        </div>
      </div>
      <NavigationButtons search={search} searchActive={searchActive} />
    </div>
  );
};

const NavigationMain = () => {
  return (
    <Suspense fallback={<div className="w-full h-14.75 bg-transparent" />}>
      <NavigationContent />
    </Suspense>
  );
};

export default NavigationMain;
