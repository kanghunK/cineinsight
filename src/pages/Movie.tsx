import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import MovieLayout from "@/component/MovieLayout";
import {
    responseMovieGenre,
    selectMovieGenre,
    useGetSelectedMovieDataQuery,
} from "@/app/services/movieAPI";
import { useAppSelector } from "@/app/hooks";

function Movie() {
    const [searchParams] = useSearchParams();

    const { genres: movieGenre } = useAppSelector(
        selectMovieGenre
    ) as responseMovieGenre;
    const [currentGenreId] = useState(
        useMemo(() => {
            const selectedGenre = movieGenre?.find((el) => {
                if (el.name === searchParams.get("genre")) return el;
            });
            return selectedGenre?.id;
        }, [searchParams, movieGenre])
    );

    // 선택한 무비장르 데이터들 받아오는 요청
    const {
        data: selectedMovieData,
        error: loadMovieDataError,
        isLoading: movieDataLoading,
    } = useGetSelectedMovieDataQuery(currentGenreId ?? 0);

    console.log("테스트", movieGenre, selectedMovieData);

    // 장르가 현재 데이터 베이스에서 조회되지 않을때
    if (!currentGenreId) {
        return <div>선택하신 장르를 조회할 수 없습니다..</div>;
    }

    return (
        <MovieLayout>
            {loadMovieDataError ? (
                <div>오류 발생..</div>
            ) : (
                <ContentBox>
                    <h2>선택한 영역</h2>
                    <Content>
                        {movieDataLoading ? (
                            <div>로딩중..</div>
                        ) : selectedMovieData ? (
                            selectedMovieData.results.map((data) => (
                                <MovieCard>{data.title}</MovieCard>
                            ))
                        ) : (
                            <div>선택된 데이터가 없습니다..</div>
                        )}
                    </Content>
                </ContentBox>
            )}
        </MovieLayout>
    );
}

export default Movie;

const ContentBox = styled.div``;

const Content = styled.div``;

const MovieCard = styled.div``;
