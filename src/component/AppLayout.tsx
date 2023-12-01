import styled from "styled-components";
import LeftMenu from "./LeftMenu";
import { StrictPropsWithChildren } from "../type/types";
import RightIcon from "../assets/rightArrow.svg?react";

function AppLayout({ children }: StrictPropsWithChildren) {
    return (
        <>
            <LeftMenu />
            <RootContainer>
                <Header>
                    <h1>CineInsight</h1>
                    <p>영화 정보 조회 사이트</p>
                    <div>
                        <RightIcon />
                    </div>
                </Header>
                <MainContainer>{children}</MainContainer>
            </RootContainer>
        </>
    );
}

export default AppLayout;

const RootContainer = styled.div``;

const Header = styled.header``;

const MainContainer = styled.main``;
