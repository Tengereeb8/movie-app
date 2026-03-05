"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getMovieGenres } from "@/lib/api";
import { Genre } from "@/lib/movie-data-types";

type DesktopSearchPropsType = {
  searchActive: boolean;
};

export const DesktopSearch = ({ searchActive }: DesktopSearchPropsType) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchGenres = async () => {
      const genre = await getMovieGenres();
      setGenres(genre.genres);
    };
    fetchGenres();
  }, []);

  const activeGenres =
    pathname === "/search"
      ? (searchParams.get("genre")?.split(",").filter(Boolean) ?? [])
      : [];

  const toggleGenre = (genreId: number) => {
    const id = String(genreId);
    const newGenres = activeGenres.includes(id)
      ? activeGenres.filter((g) => g !== id)
      : [...activeGenres, id];

    const params = new URLSearchParams();
    params.delete("page");
    if (newGenres.length > 0) {
      params.set("genre", newGenres.join(","));
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {!searchActive ? (
            <NavigationMenuTrigger className="dark:text-white">
              Genre
            </NavigationMenuTrigger>
          ) : (
            <NavigationMenuTrigger className="dark:bg-neutral-900 border border-neutral-300 dark:text-white p-0 dark:border-neutral-800 pr-1 w-10 flex justify-center items-center h-10" />
          )}
          <NavigationMenuContent className="p-5">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-2xl leading-8 text-[#09090B] dark:text-white">
                Genres
              </h1>
              <p className="text-base text-[#09090B] dark:text-white">
                Select one or more genres
              </p>
            </div>
            <div className="w-full py-4">
              <div className="w-full h-px bg-gray-300"></div>
            </div>
            <ul className="flex w-77 lg:w-144.25 gap-1 h-fit flex-wrap">
              {genres.map((genre) => {
                const isActive = activeGenres.includes(String(genre.id));
                return (
                  <Badge
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`cursor-pointer font-semibold text-[12px]  h-5 select-none transition-colors
                      ${
                        isActive
                          ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                          : "text-black bg-white border border-gray-300 dark:bg-black dark:text-white dark:border-neutral-800"
                      }`}
                  >
                    {genre.name}{" "}
                    <img src="/cr.svg" alt="" className="dark:hidden" />
                    <img src="/wcr.svg" alt="" className="dark:flex hidden" />
                  </Badge>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
