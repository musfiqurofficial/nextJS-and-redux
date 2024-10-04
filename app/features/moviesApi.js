import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://103.112.150.230/api/v1/' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => 'movies.php',
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
