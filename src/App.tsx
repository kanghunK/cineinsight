import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import {
    ResponseMovieData,
    useGetMovieGenreQuery,
} from "./app/services/movieAPI";
import SearchResult from "./pages/SearchResult";

export interface MovieLoaderData {
    genreId: number;
    genreName: string;
    initialMovieData: ResponseMovieData;
}

export interface SearchMovieLoaderData {
    searchValue: string;
    initialMovieData: ResponseMovieData;
}

function App() {
    const apiAccessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const { data: genreInfo, error, isLoading } = useGetMovieGenreQuery();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/movie",
            element: <SearchResult />,
            loader: async ({ request }) => {
                const searchValue = new URL(request.url).searchParams.get(
                    "search"
                );

                if (!searchValue)
                    throw new Response("Not Found", { status: 404 });

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

                console.log("response: ", SearchMovieLoaderData);

                return SearchMovieLoaderData;
            },
            errorElement: <div>에러 엘레멘트</div>,
        },
        {
            path: "/movie/:genre",
            element: <Movie />,
            loader: async ({ params }) => {
                const selectedGenre = genreInfo?.genres.find(
                    (el) => el.name === params.genre
                );

                if (!selectedGenre)
                    throw new Response("Not Found", { status: 404 });

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

                console.log("response: ", movieLoaderData);

                return movieLoaderData;
            },
            errorElement: <div>에러 엘레멘트</div>,
        },
    ]);

    if (isLoading && !error) return <div>로딩중...</div>;

    if (error) return <div>데이터 서버에 연결하지 못하였습니다..</div>;

    return <RouterProvider router={router} />;
}

export default App;
