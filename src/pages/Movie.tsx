import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";

import { useGetMovieByGenreMutation } from "@/app/services/movieAPI";
import MovieLayout from "@/component/MovieLayout";
import { MemoizeMovie } from "@/component/MovieCard";
import useIntersect from "@/hook/useIntersect";
import { MovieData } from "@/type/types";
import { MovieLoaderData } from "@/App";

type ImageLoadedObj = {
    [key: number]: boolean;
};

function Movie() {
    const pageNum = useRef(2);

    const loaderData = useLoaderData() as MovieLoaderData;
    const [selectMovieData, setSelectMovieData] = useState<MovieData[]>([
        ...loaderData.initialMovieData.results,
    ]);

    // 선택한 무비장르 데이터들 받아오는 요청
    const [
        getMovieByGenre,
        { isLoading: isLoadingMovieData, error: loadMovieDataError },
    ] = useGetMovieByGenreMutation();

    // 다음 영화 데이터 fetch observer
    const observerRef = useIntersect(
        async (entry, observer) => {
            if (
                entry.intersectionRatio <= 0 ||
                !entry.isIntersecting ||
                selectMovieData.length === 0 ||
                isLoadingMovieData
            )
                return;

            observer.unobserve(entry.target);
            await addSelectMovieData();
        },
        { threshold: 0.5 }
    );

    // 다음 페이지 영화 목록 불러오기
    const addSelectMovieData = useCallback(async () => {
        const response = await getMovieByGenre({
            genreId: loaderData.genreId ?? 0,
            pageNum: pageNum.current,
        }).unwrap();

        setSelectMovieData((prev) => [...prev, ...response.results]);

        const newObj: ImageLoadedObj = {};
        response.results.forEach((el) => {
            newObj[el.id] = false;
        });
        pageNum.current += 1;
    }, [getMovieByGenre, loaderData.genreId]);

    useEffect(() => {
        console.log("loaderData", loaderData);

        setSelectMovieData([...loaderData.initialMovieData.results]);
    }, [loaderData]);

    // 장르가 현재 데이터 베이스에서 조회되지 않을때
    if (!loaderData) {
        return <div>선택하신 장르를 조회할 수 없습니다..</div>;
    }

    if (loadMovieDataError) {
        console.log("오류 발생 시 toast 띄우기");
    }

    return (
        <MovieLayout>
            <ContentBox>
                <h2>{loaderData.genreName}</h2>
                <Content>
                    {selectMovieData ? (
                        selectMovieData.map((data) => (
                            <MemoizeMovie
                                key={data.id}
                                movieData={data}
                                observerRef={null}
                            />
                        ))
                    ) : (
                        <div>선택된 데이터가 없습니다..</div>
                    )}
                </Content>
                {isLoadingMovieData && <div>데이터 로딩중..</div>}
                <ObserverTarget ref={observerRef} />
            </ContentBox>
        </MovieLayout>
    );
}

export default Movie;

const ContentBox = styled.div`
    padding: 0 50px;

    h2 {
        padding-left: 10px;
        font-size: 1.5rem;
        margin-bottom: 30px;
        color: #ffc107;
        font-family: "GmarketSans";
    }
`;

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    @media screen and (min-width: 590px) {
        justify-content: flex-start;
    }
`;

const ObserverTarget = styled.div`
    height: 20px;
`;
