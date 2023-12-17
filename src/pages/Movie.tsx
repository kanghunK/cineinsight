import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import {
    responseMovieGenre,
    selectMovieGenre,
    useGetMovieByGenreMutation,
} from "@/app/services/movieAPI";
import { useAppSelector } from "@/app/hooks";
import MovieLayout from "@/component/MovieLayout";
import { MemoizeMovie } from "@/component/MovieCard";
import useIntersect from "@/hook/useIntersect";
import { MovieData } from "@/type/types";

type imageLoadedObj = {
    [key: number]: boolean;
};

function Movie() {
    const [searchParams] = useSearchParams();
    const selectGenreQuery = searchParams.get("genre");
    const pageNum = useRef(1);
    const isExecuted = useRef(false);

    const { genres: movieGenre } = useAppSelector(
        selectMovieGenre
    ) as responseMovieGenre;
    const [selectMovieData, setSelectMovieData] = useState<MovieData[]>([]);
    const currentGenreId = useMemo(() => {
        const selectedGenre = movieGenre?.find((el) => {
            if (el.name === selectGenreQuery) return el;
        });
        return selectedGenre?.id;
    }, [selectGenreQuery, movieGenre]);

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
            genreId: currentGenreId ?? 0,
            pageNum: pageNum.current,
        }).unwrap();

        setSelectMovieData((prev) => [...prev, ...response.results]);

        const newObj: imageLoadedObj = {};
        response.results.forEach((el) => {
            newObj[el.id] = false;
        });
        pageNum.current += 1;

        console.log(response);
    }, [currentGenreId, getMovieByGenre]);

    useEffect(() => {
        if (import.meta.env.DEV && isExecuted.current) return;

        addSelectMovieData();
        isExecuted.current = true;

        return () => {
            setSelectMovieData([]);
        };
    }, [addSelectMovieData]);

    // 장르가 현재 데이터 베이스에서 조회되지 않을때
    if (!currentGenreId) {
        return <div>선택하신 장르를 조회할 수 없습니다..</div>;
    }

    if (loadMovieDataError) {
        console.log("오류 발생 시 toast 띄우기");
    }

    return (
        <MovieLayout>
            <ContentBox>
                <h2>{selectGenreQuery}</h2>
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
