import { useMemo, useState } from "react";
import styled from "styled-components";
import LeftMenu from "./LeftMenu";
import { StrictPropsWithChildren } from "../type/types";
import RightIcon from "../assets/rightArrow.svg?react";
import LeftMenuContext from "../context/LeftMenuContext";

function AppLayout({ children }: StrictPropsWithChildren) {
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
                        <p>영화 정보 조회 사이트</p>
                        <div onClick={() => setLeftMenuState(true)}>
                            <RightIcon />
                        </div>
                    </Header>
                    <MainContainer>{children}</MainContainer>
                </RootContainer>
            </LeftMenuContext.Provider>
        </>
    );
}

export default AppLayout;

const RootContainer = styled.div``;

const Header = styled.header``;

const MainContainer = styled.main``;
