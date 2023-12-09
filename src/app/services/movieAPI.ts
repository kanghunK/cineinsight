import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiAccessToken = import.meta.env.VITE_ACCESS_TOKEN;

export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    endpoints: (builder) => ({
        getMovieGenreData: builder.query({
            query: () => ({
                url: `/api/genre/movie/list?language=ko`,
                headers: {
                    "Content-type": "appliation/json",
                    Authorization: `Bearer ${apiAccessToken}`,
                },
            }),
        }),
    }),
});

export const { useGetMovieGenreDataQuery } = movieApi;

// export const getMovieGenre = movieApi.enhanceEndpoints({
//     endpoints: {
//         movieGenreData: {
//             query: () => ({
//                 url: "/genre/movie/list",
//                 headers: {
//                     Authorization: accessToken,
//                     "Content-type": "appliation/json",
//                 },
//                 responseHandler: (response) =>
//                     response.json(),
//             }),
//         },
//     },
// });
