import { useContext } from "react";
import styled from "styled-components";
import ActionIcon from "../assets/action.svg?react";
import RomanceIcon from "../assets/romance.svg?react";
import ThillerIcon from "../assets/thriller.svg?react";
import HorrorIcon from "../assets/horror.svg?react";
import ComedicIcon from "../assets/comedic.svg?react";
import LeftIcon from "../assets/leftArrow.svg?react";
import HomeIcon from "../assets/home.svg?react";
import LeftMenuContext from "../context/leftMenuContext";

function LeftMenu() {
    const { leftMenuState, setLeftMenuState } = useContext(LeftMenuContext);
    const onCloseLeftMenu = () => setLeftMenuState(false);

    return (
        <Container $show={leftMenuState}>
            <div className="close_btn" onClick={onCloseLeftMenu}>
                <LeftIcon />
            </div>
            <MenuIcon>
                <IconButton>
                    <div className="icon">
                        <HomeIcon />
                    </div>
                    <span>홈으로</span>
                </IconButton>
                <IconButton>
                    <div className="icon">
                        <ActionIcon />
                    </div>
                    <span>액션</span>
                </IconButton>
                <IconButton>
                    <div className="icon">
                        <RomanceIcon />
                    </div>
                    <span>로맨스</span>
                </IconButton>
                <IconButton>
                    <div className="icon">
                        <ThillerIcon />
                    </div>
                    <span>스릴러</span>
                </IconButton>
                <IconButton>
                    <div className="icon">
                        <HorrorIcon />
                    </div>
                    <span>공포</span>
                </IconButton>
                <IconButton>
                    <div className="icon">
                        <ComedicIcon />
                    </div>
                    <span>코미디</span>
                </IconButton>
            </MenuIcon>
        </Container>
    );
}

export default LeftMenu;

const Container = styled.div<{ $show: boolean }>`
    position: absolute;
    z-index: 10;
    display: flex;
    flex-direction: column;
    padding: 40px 0;
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

const MenuIcon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex: 1;
    width: 70px;
    gap: 3rem;

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

    svg path {
        fill: #ccd2d7;
    }

    &:hover {
        background-color: #6e7478;

        svg g path {
            fill: #e8ece5;
        }
    }

    .icon {
        width: 30px;
        margin: auto;
    }

    @media screen and (min-width: 600px) {
        width: 80px;

        .icon {
            width: 40px;
        }
    }
`;
