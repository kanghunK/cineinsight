import { MovieData } from "@/type/types";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { memo } from "react";
import { useAppDispatch } from "@/app/hooks";
import { openMovieInfoModal } from "@/app/reducer/elementTrigger";

interface MovieCardProps {
    movieData: MovieData;
    observerRef: React.MutableRefObject<null> | null;
}

export function MovieCard({ movieData, observerRef }: MovieCardProps) {
    const dispatch = useAppDispatch();

    return (
        <MovieCardBox title={movieData.title} ref={observerRef}>
            <Photo>
                <LazyLoadImage
                    src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                    alt={movieData.title}
                />
            </Photo>
            <Content>{movieData.title}</Content>
            <Footer>
                <button
                    type="button"
                    onClick={() => dispatch(openMovieInfoModal(movieData))}
                >
                    더보기
                </button>
            </Footer>
        </MovieCardBox>
    );
}

export const MemoizeMovie = memo(MovieCard);

const MovieCardBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    overflow: hidden;
    background: #a7a9ac;
    color: #f2f3f4;

    flex-grow: 1;
    transform: scale(1);
    transition: transform 0.3s ease;
    margin: 20px 10px;
    max-width: 320px;
    width: 200px;
    height: 340px;
    border-radius: 12px;
    box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.2);

    &:hover {
        transform: scale(1.1);
    }
`;

const Photo = styled.div`
    position: relative;
    overflow: hidden;

    height: 280px;

    & > img {
        position: absolute;
        object-fit: cover;

        width: auto;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        @media screen and (min-width: 325px) {
            width: 100%;
            height: auto;
        }
    }
`;

const Content = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: "GmarketSans";

    height: 30px;
    line-height: 35px;
    font-weight: 500;
    font-size: 15px;
`;

const Footer = styled.div`
    height: 30px;

    & > button {
        position: relative;
        z-index: 1;

        display: inline-block;
        overflow: hidden;
        user-select: none;
        vertical-align: middle;
        text-align: center;
        transition: 0.3s ease-out;
        cursor: pointer;

        border: none;
        border-radius: 4px;
        padding: 3px 10px;
        color: #fff;
        background-color: #26a69a;
        letter-spacing: 0.5px;

        &:hover {
            color: #0056b3;
            box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14),
                0 1px 7px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -1px rgba(0, 0, 0, 0.2);
        }
    }
`;
