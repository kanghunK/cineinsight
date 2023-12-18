import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeLeftMenuState } from "@/app/reducer/elementTrigger";

import LeftMenu from "./LeftMenu";
import MovieInfoModal from "./MovieInfoModal";
import { StrictPropsWithChildren } from "../type/types";
import RightIcon from "../assets/rightArrow.svg?react";

function MovieLayout({ children }: StrictPropsWithChildren) {
    const dispatch = useAppDispatch();
    const { movieInfoModal } = useAppSelector((state) => state.elementTrigger);

    return (
        <>
            <LeftMenu />
            <LayoutWrapper $isOpenedModal={movieInfoModal.isOpened}>
                <LayoutContainer>
                    <Header>
                        <h1>CineInsight</h1>
                        <RightArrow
                            onClick={() => dispatch(changeLeftMenuState(true))}
                        >
                            <RightIcon />
                        </RightArrow>
                    </Header>
                    <MainContainer>{children}</MainContainer>
                </LayoutContainer>
            </LayoutWrapper>
            {movieInfoModal.isOpened && <MovieInfoModal />}
        </>
    );
}

export default MovieLayout;

const LayoutWrapper = styled.div<{ $isOpenedModal: boolean }>`
    height: 100vh;
    overflow: ${({ $isOpenedModal }) => ($isOpenedModal ? "hidden" : "auto")};
`;

const LayoutContainer = styled.div`
    min-height: 100%;
    background-color: #6f7179;
`;

const Header = styled.header`
    position: relative;
    overflow: hidden;
    text-align: center;

    padding: 20px 0;
    font-size: 2rem;

    h1 {
        color: #f2f3f4;
        font-size: calc(2rem + 1vw);
        font-family: "Aileron";
    }
`;

const RightArrow = styled.div`
    position: fixed;
    display: flex;
    align-items: center;

    top: 20px;
    left: 20px;
    padding: 5px;
    border-radius: 50%;

    cursor: pointer;

    & > svg {
        stroke: #f2f3f4;
    }

    &:hover {
        box-shadow: 0px 0px 1px 1px #b0b7be;
    }
`;

const MainContainer = styled.main``;
