"use client";

import React from "react";
import { useGetMoviesQuery } from "@/app/features/moviesApi";
import Image from "next/image";

export default function Home() {
  const { data, error, isLoading } = useGetMoviesQuery();

  console.log(data);

  return (
    <div>
      <div className="px-4 pt-4 mx-auto lg:py-14 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
        <div className="grid grid-cols-4 gap-4">
          {data?.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
            >
              <div
                className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                style={{
                  backgroundImage: `url(http://103.112.150.230/Data/disk1/movies/posters/${movie.poster})`,
                }}
              ></div>

              <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                <h3 className="py-2 font-bold tracking-wide text-center dark:text-white">
                  {movie.MovieTitle} - {""}
                  <span className="text-[12px]">({movie.MovieYear})</span>{" "}
                </h3>

                <p className="pb-2 text-[10px] text-center">
                  {movie.Movielang}
                </p>

                <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                  <span className="font-bold  dark:text-gray-200">
                    {movie.MovieSize}
                  </span>
                  <a
                    href={movie.MovieWatchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                      Watch Now
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
