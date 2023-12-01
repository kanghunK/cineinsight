import styled from "styled-components";
import ActionIcon from "../assets/action.svg?react";
import RomanceIcon from "../assets/romance.svg?react";
import ThillerIcon from "../assets/thriller.svg?react";
import HorrorIcon from "../assets/horror.svg?react";
import ComedicIcon from "../assets/comedic.svg?react";

function LeftMenu() {
    return (
        <Container>
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
        </Container>
    );
}

export default LeftMenu;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 70px;
    gap: 3rem;

    background-color: #4f5458;

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

    svg g path {
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
