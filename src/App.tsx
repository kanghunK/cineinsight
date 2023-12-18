import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import {
    responseMovieData,
    useGetMovieGenreQuery,
} from "./app/services/movieAPI";

export interface MovieLoaderData {
    genreId: number;
    initialMovieData: responseMovieData;
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
