import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import { useGetMovieGenreDataQuery } from "./app/services/movieAPI";

function App() {
    const { error, isLoading } = useGetMovieGenreDataQuery();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/movie",
            element: <Movie />,
        },
    ]);

    if (isLoading && !error) return <div>로딩중...</div>;

    if (error) return <div>데이터 서버에 연결하지 못하였습니다..</div>;

    return <RouterProvider router={router} />;
}

export default App;
