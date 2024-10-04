// Header.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../../asset/logo.png";
import SwitchToggle from "../SwitchToggle";

import { RxCaretDown } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { useGetMoviesQuery } from "@/app/features/moviesApi";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();


  const moviesList = [
    { name: "Inception", link: "/movies/inception" },
    { name: "The Matrix", link: "/movies/the-matrix" },
    { name: "Interstellar", link: "/movies/interstellar" },
    { name: "Avatar", link: "/movies/avatar" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <Link href="/">
          <Image
            src={logo}
            alt=""
            width={500}
            height={500}
            className="w-auto h-[45px]"
          />
        </Link>
        <ul className="flex items-center hidden space-x-8 lg:flex">
          <li>
            <Link
              href="/latest"
              className={`font-medium tracking-wide transition-colors duration-200 hover:text-blue-500 ${
                pathname === "/latest" ? "text-blue-600" : ""
              }`}
            >
              Latest
            </Link>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`font-medium tracking-wide transition-colors duration-200 hover:text-blue-500 focus:outline-none flex justify-center items-center gap-1 ${
                pathname.includes("/movies") ? "text-blue-600" : ""
              }`}
            >
              Movies <RxCaretDown className="w-5 h-5" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                {moviesList.map((movie, index) => (
                  <Link
                    key={index}
                    href={movie.link}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                      pathname === movie.link ? "text-blue-600" : ""
                    }`}
                  >
                    {movie.name}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link
              href="/livetv"
              className={`font-medium tracking-wide transition-colors duration-200 hover:text-blue-500 ${
                pathname === "/livetv" ? "text-blue-600" : ""
              }`}
            >
              Live TV
            </Link>
          </li>
          <li>
            <Link
              href="/partners"
              className={`font-medium tracking-wide transition-colors duration-200 hover:text-blue-500 ${
                pathname === "/partners" ? "text-blue-600" : ""
              }`}
            >
              Partners
            </Link>
          </li>
        </ul>
        <ul className="flex items-center hidden space-x-4 lg:flex">
          <li className="">
            <SwitchToggle />
          </li>
          <li>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600 text-white transition duration-200 shadow-md focus:shadow-outline focus:outline-none"
            >
              Sign up
            </Link>
          </li>
        </ul>
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-purple-50 focus:bg-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <a
                      href="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      <svg
                        className="w-8 text-blue-500"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        stroke="currentColor"
                        fill="none"
                      >
                        <rect x="3" y="1" width="7" height="12" />
                        <rect x="3" y="17" width="7" height="6" />
                        <rect x="14" y="1" width="7" height="6" />
                        <rect x="14" y="11" width="7" height="12" />
                      </svg>
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Company
                      </span>
                    </a>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="/"
                        aria-label="Our product"
                        title="Our product"
                        className="font-medium tracking-wide transition-colors duration-200 hover:text-blue-500"
                      >
                        Product
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-label="Our product"
                        title="Our product"
                        className="font-medium tracking-wide transition-colors duration-200 hover:text-blue-500"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-label="Product pricing"
                        title="Product pricing"
                        className="font-medium tracking-wide transition-colors duration-200 hover:text-blue-500"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-label="About us"
                        title="About us"
                        className="font-medium tracking-wide transition-colors duration-200 hover:text-blue-500"
                      >
                        About us
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide hover:text-white dark: transition duration-200 rounded shadow-md bg-blue-500 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                        aria-label="Sign up"
                        title="Sign up"
                      >
                        Sign up
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
