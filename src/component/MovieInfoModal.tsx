import styled, { keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { closeMovieInfoModal } from "@/app/reducer/elementTrigger";
import Scrollbars from "react-custom-scrollbars-2";

function MovieInfoModal() {
    const dispatch = useAppDispatch();
    const { movieInfoModal } = useAppSelector((state) => state.elementTrigger);

    return (
        <ModalSection>
            <Wrapper>
                <Container>
                    <Scrollbars
                        style={{
                            height: 400,
                        }}
                    >
                        <CloseButton
                            type="button"
                            onClick={() => dispatch(closeMovieInfoModal())}
                        >
                            ❌
                        </CloseButton>
                        <ContentBox>
                            <Photo>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movieInfoModal.data?.poster_path}`}
                                    alt={movieInfoModal.data?.title}
                                />
                            </Photo>
                            <TextContent>
                                <ReleaseDate>
                                    <h3>개봉일</h3>
                                    <p>{movieInfoModal.data?.release_date}</p>
                                </ReleaseDate>
                                <Overview>
                                    <h3>개요</h3>
                                    <p>
                                        {movieInfoModal.data?.overview
                                            ? movieInfoModal.data?.overview
                                            : "내용 없음"}
                                    </p>
                                </Overview>
                            </TextContent>
                        </ContentBox>
                    </Scrollbars>
                </Container>
                {/* <BackDrop /> */}
            </Wrapper>
        </ModalSection>
    );
}

export default MovieInfoModal;

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

     100% {
        opacity: 1;
     }
`;

const ModalSection = styled.div`
    position: fixed;
    overflow: auto;

    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: ${fadeIn} 1s ease both;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(20px);
`;

const Wrapper = styled.div`
    position: relative;
    /* overflow: auto; */

    width: 100%;
    height: 100%;
    min-width: 320px;
`;

const Container = styled.div`
    position: relative;
    background-color: white;
    overflow: hidden;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 300px;
    max-width: 800px;
    width: 70%;
    border-radius: 20px;
    border: 0;
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.7s ease both;
`;

const CloseButton = styled.button`
    filter: grayscale(1);
    cursor: pointer;
    border: none;
    background: none;
    position: absolute;
    transform-origin: center;
    transition: ease filter, transform 0.3s;

    top: 15px;
    right: 10px;

    &:hover {
        filter: grayscale(0);
        transform: scale(1.1);
    }
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    gap: 2rem;
    padding: 2rem 3rem;

    @media screen and (min-width: 950px) {
        flex-direction: row;
    }
`;

const Photo = styled.div`
    height: 270px;

    & > img {
        object-fit: cover;
        width: auto;

        height: 100%;
    }
`;

const TextContent = styled.div`
    display: flex;
    flex-direction: column;

    flex: 1;
    gap: 1.5rem;
`;

const ReleaseDate = styled.div`
    display: flex;
    flex-wrap: wrap;

    gap: 1.5rem;

    & > h3 {
        font-size: 1.1rem;
        font-weight: bold;
    }
`;

const Overview = styled.div`
    display: flex;
    flex-direction: column;

    gap: 1rem;

    & > h3 {
        font-size: 1.1rem;
        font-weight: bold;
    }
`;
