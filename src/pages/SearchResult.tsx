import { SearchMovieLoaderData } from "@/App";
import { useGetSearchMovieMutation } from "@/app/services/movieAPI";
import { MemoizeMovie } from "@/component/MovieCard";
import MovieLayout from "@/component/MovieLayout";
import useIntersect from "@/hook/useIntersect";
import { MovieData } from "@/type/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";

function SearchResult() {
    const pageNum = useRef(2);

    const loaderData = useLoaderData() as SearchMovieLoaderData;
    const [dataLoadEnd, setDataLoadEnd] = useState(false);
    const [selectMovieData, setSelectMovieData] = useState<MovieData[]>([
        ...loaderData.initialMovieData.results,
    ]);

    const [
        getSearchMovie,
        { isLoading: isLoadingSearchMovie, error: loadMovieDataError },
    ] = useGetSearchMovieMutation();

    // 다음 영화 데이터 fetch observer
    const observerRef = useIntersect(
        async (entry, observer) => {
            if (
                entry.intersectionRatio <= 0 ||
                !entry.isIntersecting ||
                selectMovieData.length === 0 ||
                dataLoadEnd ||
                isLoadingSearchMovie
            )
                return;

            observer.unobserve(entry.target);
            await addSearchMovieData();
        },
        { threshold: 0.5 }
    );

    // 검색한 영화 페이지 불러오기
    const addSearchMovieData = useCallback(async () => {
        const response = await getSearchMovie({
            searchValue: loaderData.searchValue,
            pageNum: pageNum.current,
        }).unwrap();

        if (!response) throw new Error("서버 에러");

        if (response.results.length === 0) {
            setDataLoadEnd(true);
            return;
        }

        setSelectMovieData((prev) => [...prev, ...response.results]);
        pageNum.current += 1;
    }, [getSearchMovie, loaderData.searchValue]);

    useEffect(() => {
        setSelectMovieData([...loaderData.initialMovieData.results]);
    }, [loaderData]);

    if (loadMovieDataError) throw loadMovieDataError;

    return (
        <MovieLayout>
            <ContentBox>
                <h2>
                    <span style={{ color: "#FFEECB" }}>
                        "{loaderData.searchValue}"
                    </span>{" "}
                    &nbsp;&nbsp;검색 결과
                </h2>
                <Content>
                    {selectMovieData.length > 0 ? (
                        selectMovieData.map((data) => (
                            <MemoizeMovie
                                key={data.id}
                                movieData={data}
                                observerRef={null}
                            />
                        ))
                    ) : (
                        <NoticeText>선택된 데이터가 없습니다..</NoticeText>
                    )}
                </Content>
                {isLoadingSearchMovie && (
                    <DataLoading>
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="#F7F9FF"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </DataLoading>
                )}
                {dataLoadEnd && <NoticeText>마지막 페이지 입니다.</NoticeText>}
                <ObserverTarget ref={observerRef} />
            </ContentBox>
        </MovieLayout>
    );
}

export default SearchResult;

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

const DataLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
`;

const NoticeText = styled.div`
    text-align: center;
    color: #f7f9ff;

    width: 100%;
    margin: 0.4rem 0;
    font-size: 1.1rem;
`;
