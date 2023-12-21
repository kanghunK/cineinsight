import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ActionIcon from "@/assets/action.svg?react";
import ComedicIcon from "@/assets/comedic.svg?react";
import ThillerIcon from "@/assets/thriller.svg?react";
import HorrorIcon from "@/assets/horror.svg?react";
import RomanceIcon from "@/assets/romance.svg?react";
import MovieSearch from "@/component/MovieSearch";

function Home() {
    const navigate = useNavigate();

    const goToMoviePage = (genre: string) => () => navigate(`/movie/${genre}`);

    return (
        <HomeContainer>
            <VideoBackground autoPlay loop muted playsInline>
                <source src="/public/back_video.mp4" type="video/mp4" />
            </VideoBackground>
            <Content>
                <h1>CineInsight</h1>
                <span>영화 정보 조회하기</span>
                <MovieSearch />
                <MovieCategoryBox>
                    <MovieCategory onClick={goToMoviePage("액션")}>
                        <ActionIcon />
                        <p>Action</p>
                    </MovieCategory>
                    <MovieCategory onClick={goToMoviePage("로맨스")}>
                        <RomanceIcon />
                        <p>Romance</p>
                    </MovieCategory>
                    <MovieCategory onClick={goToMoviePage("스릴러")}>
                        <ThillerIcon />
                        <p>Thiller</p>
                    </MovieCategory>
                    <MovieCategory onClick={goToMoviePage("공포")}>
                        <HorrorIcon />
                        <p>Horror</p>
                    </MovieCategory>
                    <MovieCategory onClick={goToMoviePage("코미디")}>
                        <ComedicIcon />
                        <p>Comedic</p>
                    </MovieCategory>
                </MovieCategoryBox>
            </Content>
        </HomeContainer>
    );
}

export default Home;

const HomeContainer = styled.div`
    height: 100vh;
    overflow: hidden;
`;

const VideoBackground = styled.video`
    position: absolute;
    right: 0;
    bottom: 0;
    max-width: none;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;

    @media (min-aspect-ratio: 16/9) {
        width: 100%;
        height: auto;
    }
    @media (max-aspect-ratio: 16/9) {
        width: auto;
        height: 100%;
    }
`;

const MovieCategoryBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 40px;
`;

const MovieCategory = styled.div`
    width: 80px;
    height: 80px;
    background-color: rgb(225 88 45 / 75%);
    font-size: 12px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;

    p {
        margin: 0;
    }

    svg {
        width: 25px;
        margin-bottom: 5px;

        path {
            fill: white;
        }
    }
`;

const Content = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    max-width: 900px;
    padding-top: 50px;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;

    h1 {
        font-size: calc(0.7rem + 5vw);
        margin-bottom: 40px;
        font-family: "BACKTO1982";
    }
`;
