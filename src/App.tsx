import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    ResponseMovieData,
    useGetMovieGenreQuery,
} from "./app/services/movieAPI";
import { lazy, Suspense } from "react";
import Loading from "./component/Loading";
import ErrorBoundary from "./component/ErrorBoundary";

export interface MovieLoaderData {
    genreId: number;
    genreName: string;
    initialMovieData: ResponseMovieData;
}

export interface SearchMovieLoaderData {
    searchValue: string;
    initialMovieData: ResponseMovieData;
}

const HomePage = lazy(() => import("@/pages/Home"));
const MoviePage = lazy(() => import("@/pages/Movie"));
const SearchResultPage = lazy(() => import("@/pages/SearchResult"));

function App() {
    const apiAccessToken = process.env.ACCESS_TOKEN;
    const { data: genreInfo, error, isLoading } = useGetMovieGenreQuery();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
            errorElement: <ErrorBoundary />,
        },
        {
            path: "/movie",
            element: <SearchResultPage />,
            loader: async ({ request }) => {
                const searchValue = new URL(request.url).searchParams.get(
                    "search"
                );

                if (error) throw error;

                if (!searchValue)
                    throw new Response("Not found page", { status: 404 });

                const response = await fetch(
                    `/api/3/search/movie?query=${searchValue}&include_adult=false&language=ko&page=1`,
                    {
                        headers: {
                            "Content-type": "appliation/json",
                            Authorization: `Bearer ${apiAccessToken}`,
                        },
                    }
                );

                const responseData = await response.json();
                const SearchMovieLoaderData: SearchMovieLoaderData = {
                    searchValue: searchValue,
                    initialMovieData: responseData,
                };

                return SearchMovieLoaderData;
            },
            errorElement: <ErrorBoundary />,
        },
        {
            path: "/movie/:genre",
            element: <MoviePage />,
            loader: async ({ params }) => {
                const selectedGenre = genreInfo?.genres.find(
                    (el) => el.name === params.genre
                );

                if (error) throw error;

                if (!selectedGenre)
                    throw new Response("Not found page", { status: 404 });

                const response = await fetch(
                    `/api/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc&with_genres=${selectedGenre.id}`,
                    {
                        headers: {
                            "Content-type": "appliation/json",
                            Authorization: `Bearer ${apiAccessToken}`,
                        },
                    }
                );

                const responseData = await response.json();
                const movieLoaderData: MovieLoaderData = {
                    genreId: selectedGenre.id,
                    genreName: selectedGenre.name,
                    initialMovieData: responseData,
                };

                return movieLoaderData;
            },
            errorElement: <ErrorBoundary />,
        },
    ]);

    if (isLoading && !error) return <Loading />;

    return (
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
