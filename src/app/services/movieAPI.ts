import { MovieData, MovieGenreData } from "@/type/types";
import { createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiAccessToken = process.env.ACCESS_TOKEN;

export interface ResponseMovieGenre {
    genres: MovieGenreData[];
}

export interface ResponseMovieData {
    page: number;
    results: MovieData[];
}

export interface GetMovieByGenreArg {
    pageNum: number;
    genreId: number;
}

export interface GetSearchMovieArg {
    pageNum: number;
    searchValue: string;
}

export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    endpoints: (builder) => ({
        getMovieGenre: builder.query<ResponseMovieGenre, void>({
            query: () => ({
                url: `/api/3/genre/movie/list?language=ko`,
                headers: {
                    "Content-type": "appliation/json",
                    Authorization: `Bearer ${apiAccessToken}`,
                },
            }),
        }),
        getMovieByGenre: builder.mutation<
            ResponseMovieData,
            GetMovieByGenreArg
        >({
            query: ({ pageNum, genreId }) => ({
                url: `/api/3/discover/movie?include_adult=false&include_video=false&language=ko&page=${pageNum}&sort_by=popularity.desc&with_genres=${genreId}`,
                headers: {
                    "Content-type": "appliation/json",
                    Authorization: `Bearer ${apiAccessToken}`,
                },
            }),
        }),
        getSearchMovie: builder.mutation<ResponseMovieData, GetSearchMovieArg>({
            query: ({ pageNum, searchValue }) => ({
                url: `/api/3/search/movie?query=${searchValue}&include_adult=false&language=ko&page=${pageNum}`,
                headers: {
                    "Content-type": "appliation/json",
                    Authorization: `Bearer ${apiAccessToken}`,
                },
            }),
        }),
    }),
});

// 각 쿼리에 해당하는 패칭 함수
export const {
    useGetMovieGenreQuery,
    useGetMovieByGenreMutation,
    useGetSearchMovieMutation,
} = movieApi;

// rootState에서 movieGenre 데이터를 꺼내는 selector를 생성
export const movieGenreResult = movieApi.endpoints.getMovieGenre.select();
export const selectMovieGenre = createSelector(
    movieGenreResult,
    (movieGenreData) => movieGenreData.data
);
