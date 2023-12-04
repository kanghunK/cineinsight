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
                        <div className="title">
                            <h1>CineInsight</h1>
                            <span>영화 정보 조회 사이트</span>
                        </div>
                        <div
                            className="menu_btn"
                            onClick={() => setLeftMenuState(true)}
                        >
                            <RightIcon />
                        </div>
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

    .title {
        overflow: hidden;
        text-align: center;
    }

    .menu_btn {
        position: absolute;
        top: 20px;
        left: 20px;
        display: inline-block;

        cursor: pointer;
    }
`;

const MainContainer = styled.main``;
