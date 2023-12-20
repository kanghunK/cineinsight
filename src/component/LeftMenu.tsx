import styled from "styled-components";
import ActionIcon from "../assets/action.svg?react";
import RomanceIcon from "../assets/romance.svg?react";
import ThillerIcon from "../assets/thriller.svg?react";
import HorrorIcon from "../assets/horror.svg?react";
import ComedicIcon from "../assets/comedic.svg?react";
import LeftIcon from "../assets/leftArrow.svg?react";
import HomeIcon from "../assets/home.svg?react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeLeftMenuState } from "@/app/reducer/elementTrigger";
import { useNavigate } from "react-router-dom";

function LeftMenu() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isOpenedLeftMenu } = useAppSelector(
        (state) => state.elementTrigger
    );

    const loadMovieByGenre = (genre: string) => () =>
        navigate(`/movie/${genre}`);

    return (
        <Container $show={isOpenedLeftMenu}>
            <div
                className="close_btn"
                onClick={() => dispatch(changeLeftMenuState(false))}
            >
                <LeftIcon />
            </div>
            <MenuIconBox>
                <IconButton onClick={() => navigate("/")}>
                    <div className="icon home">
                        <HomeIcon />
                    </div>
                    <span>홈으로</span>
                </IconButton>
                <IconButton onClick={loadMovieByGenre("액션")}>
                    <div className="icon">
                        <ActionIcon />
                    </div>
                    <span>액션</span>
                </IconButton>
                <IconButton onClick={loadMovieByGenre("로맨스")}>
                    <div className="icon">
                        <RomanceIcon />
                    </div>
                    <span>로맨스</span>
                </IconButton>
                <IconButton onClick={loadMovieByGenre("스릴러")}>
                    <div className="icon">
                        <ThillerIcon />
                    </div>
                    <span>스릴러</span>
                </IconButton>
                <IconButton onClick={loadMovieByGenre("공포")}>
                    <div className="icon">
                        <HorrorIcon />
                    </div>
                    <span>공포</span>
                </IconButton>
                <IconButton onClick={loadMovieByGenre("코미디")}>
                    <div className="icon">
                        <ComedicIcon />
                    </div>
                    <span>코미디</span>
                </IconButton>
            </MenuIconBox>
        </Container>
    );
}

export default LeftMenu;

const Container = styled.div<{ $show: boolean }>`
    position: fixed;
    z-index: 10;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 620px;
    background-color: #4f5458;

    transition: transform 0.5s;
    transform: ${({ $show }) =>
        $show ? "translateX(0px)" : "translateX(-100px)"};

    .close_btn {
        position: absolute;
        top: 10px;
        right: 10px;
        line-height: 0;
        cursor: pointer;

        svg {
            stroke: #ecfbff;
        }

        &:hover {
            border-radius: 3px;
            box-shadow: 0px 0px 1px 1px #80858a;
        }
    }
`;

const MenuIconBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex: 1;
    width: 70px;
    gap: 2rem;

    @media screen and (min-width: 600px) {
        width: 100px;
    }
`;

const IconButton = styled.div`
    width: 60px;

    border-radius: 7px;
    color: #ccd2d7;
    text-align: center;
    cursor: pointer;

    :not(.home) svg path {
        fill: #ccd2d7;
    }

    .icon {
        width: 30px;
        margin: auto;
    }

    .home svg {
        stroke: #ccd2d7;
    }

    &:hover {
        background-color: #6e7478;

        svg g path {
            fill: #e8ece5;
        }
    }

    @media screen and (min-width: 600px) {
        width: 80px;

        .icon {
            width: 40px;
        }
    }
`;
