import { MovieData, MovieGenreData } from "@/type/types";
import { createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiAccessToken = import.meta.env.VITE_ACCESS_TOKEN;

export interface responseMovieGenre {
    genres: MovieGenreData[];
}

export interface responseMovieData {
    page: number;
    results: MovieData[];
}

export interface responseMoviePoster {}

export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    endpoints: (builder) => ({
        getMovieGenreData: builder.query<responseMovieGenre, void>({
            query: () => ({
                url: `/api/3/genre/movie/list?language=ko`,
                headers: {
                    "Content-type": "appliation/json",
                    Authorization: `Bearer ${apiAccessToken}`,
                },
            }),
        }),
        getSelectedMovieData: builder.query<responseMovieData, number>({
            query: (genreId: number) => ({
                url: `/api/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
                headers: {
                    "Content-type": "appliation/json",
                    Authorization: `Bearer ${apiAccessToken}`,
                },
            }),
        }),
    }),
});

// 각 쿼리에 해당하는 패칭 함수
export const { useGetMovieGenreDataQuery, useGetSelectedMovieDataQuery } =
    movieApi;

// rootState에서 movieGenre 데이터를 꺼내는 selector를 생성
export const movieGenreResult = movieApi.endpoints.getMovieGenreData.select();
export const selectMovieGenre = createSelector(
    movieGenreResult,
    (movieGenreData) => movieGenreData.data
);
