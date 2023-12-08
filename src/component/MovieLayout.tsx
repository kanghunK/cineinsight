import { useMemo, useState } from "react";
import styled from "styled-components";
import LeftMenu from "./LeftMenu";
import { StrictPropsWithChildren } from "../type/types";
import RightIcon from "../assets/rightArrow.svg?react";
import LeftMenuContext from "../context/LeftMenuContext";

function MovieLayout({ children }: StrictPropsWithChildren) {
    const [leftMenuState, setLeftMenuState] = useState(false);
    const leftMenuContextValue = useMemo(
        () => ({ leftMenuState, setLeftMenuState }),
        [leftMenuState, setLeftMenuState]
    );

    return (
        <>
            <LeftMenuContext.Provider value={leftMenuContextValue}>
                <LeftMenu />
                <RootContainer>
                    <Header>
                        <h1>CineInsight</h1>
                        <RightArrow onClick={() => setLeftMenuState(true)}>
                            <RightIcon />
                        </RightArrow>
                    </Header>
                    <MainContainer>{children}</MainContainer>
                </RootContainer>
            </LeftMenuContext.Provider>
        </>
    );
}

export default MovieLayout;

const RootContainer = styled.div``;

const Header = styled.header`
    position: relative;
    overflow: hidden;
    text-align: center;
`;

const RightArrow = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    display: inline-block;

    cursor: pointer;
`;

const MainContainer = styled.main``;
