import { useState } from "react";
import styled from "styled-components";
import ActionIcon from "@/assets/action.svg?react";
import ComedicIcon from "@/assets/comedic.svg?react";
import ThillerIcon from "@/assets/thriller.svg?react";
import HorrorIcon from "@/assets/horror.svg?react";
import RomanceIcon from "@/assets/romance.svg?react";
import { useNavigate } from "react-router-dom";

interface SeachFormElements extends HTMLFormControlsCollection {
    searchMovieInput: HTMLInputElement;
}

interface FormElementAtHome extends HTMLFormElement {
    readonly elements: SeachFormElements;
}

function Home() {
    const navigate = useNavigate();
    const [focused, setFocused] = useState<boolean>(false);

    const goToMoviePage = (genre: string) => () => navigate(`/movie/${genre}`);

    const handleSearchMovie = (e: React.FormEvent<FormElementAtHome>) => {
        e.preventDefault();
        const inputValue = e.currentTarget.elements.searchMovieInput.value;

        if (!inputValue) {
            alert("검색어를 입력해주세요!");
            return;
        }

        navigate(`/movie?search=${inputValue}`);
    };

    return (
        <HomeContainer>
            <VideoBackground autoPlay loop muted playsInline>
                <source src="/back_video.mp4" type="video/mp4" />
            </VideoBackground>
            <Content>
                <h1>CineInsight</h1>
                <span>영화 정보 조회하기</span>
                <form onSubmit={handleSearchMovie}>
                    <SearchFormChildDiv>
                        <SearchFormLabelBox $focused={focused}>
                            <label>&#x270e; 영화 제목</label>
                            <SearchFormInputBox $focused={focused}>
                                <input
                                    type="text"
                                    minLength={1}
                                    maxLength={100}
                                    name="searchMovieInput"
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                />
                                <SearchInputFrame
                                    aria-hidden="true"
                                    $focused={focused}
                                ></SearchInputFrame>
                            </SearchFormInputBox>
                        </SearchFormLabelBox>
                        <SearchFormButton type="submit">검색</SearchFormButton>
                    </SearchFormChildDiv>
                </form>
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
        font-size: calc(2.5rem + 3vw);
        margin-bottom: 40px;
        font-family: "Aileron";
    }
`;

const SearchFormChildDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    max-width: 36.625rem;
    margin: 1rem auto 0;
    text-align: left;

    @media screen and (min-width: 540px) {
        flex-direction: row;
        align-items: flex-start;
        gap: 0;
    }
`;

const SearchFormLabelBox = styled.div<{ $focused: boolean }>`
    position: relative;
    display: inline-flex;
    flex: 1 1 auto;
    width: auto;

    label {
        position: absolute;
        left: 1rem;
        right: 1rem;
        top: 1.5rem;
        z-index: 1;
        display: block;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
        pointer-events: none;
        transition-property: top, font-size;
        transition-duration: 250ms;
        transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);

        ${({ $focused }) =>
            $focused &&
            "font-size: 0.75rem; top: 0.5rem; transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);"}
    }
`;

const SearchFormInputBox = styled.div<{ $focused: boolean }>`
    position: relative;
    z-index: 0;
    display: inline-flex;
    align-items: center;
    min-width: 12.5rem;
    width: 100%;
    padding: 0px;
    line-height: 100%;
    border-radius: 0.25rem;
    fill: currentcolor;
    text-align: left;

    input {
        min-height: 16px;
        min-width: 16px;
        width: 100%;
        padding: 1.5rem 1rem 0.5rem;
        font-size: 1.5rem;
        line-height: 1.5;
        filter: opacity(0%);
        appearance: none;
        color: inherit;
        background: transparent;

        ${({ $focused }) => $focused && "outline: 0; filter: opacity(100%);"}
    }
`;

const SearchInputFrame = styled.div<{ $focused: boolean }>`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-width: 1px;
    border-style: solid;
    border-radius: 0.25rem;
    background: rgba(22, 22, 22, 0.7);
    border: 1px solid rgba(128, 128, 128, 0.7);
    user-select: none;
    color: transparent;

    ${({ $focused }) =>
        $focused && "outline: white solid 0.125rem; outline-offset: 0.125rem;"}
`;

const SearchFormButton = styled.button`
    position: relative;
    display: inline-flex;
    justify-content: center;

    flex: 0 0 auto;
    width: auto;
    min-height: 4.4rem;
    margin: 0;
    padding: 0.75rem 1.5rem;
    border: 0px;
    border-radius: 0.25rem;

    text-decoration: none;
    align-items: center;
    box-sizing: border-box;
    letter-spacing: normal;
    line-height: 1;
    user-select: none;
    fill: currentcolor;
    transition-duration: 250ms;
    transition-property: background-color, border-color;
    transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
    vertical-align: text-top;
    font-size: 1.5rem;
    font-weight: 500;

    background-color: #ff3d00;
    color: #fff;
    appearance: none;
    cursor: pointer;

    @media screen and (min-width: 540px) {
        margin-left: 0.5rem;
    }
`;
