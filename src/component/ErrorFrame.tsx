import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider, css, keyframes } from "styled-components";

interface Props {
    stateCode: number | string;
    subTitle: string;
    message: string;
}

function ErrorFrame({ stateCode, subTitle, message }: Props) {
    const navigate = useNavigate();

    const theme = {
        $white: "#EDEDED",
        $gray: "#BFC0C0",
        $dark: "#585959",
        $light: "#D3DEEA",
    };

    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <HeaderText>
                    <h1>{stateCode}</h1>
                    <h2>{subTitle}</h2>
                </HeaderText>
                <GhostContainer>
                    <GhostCopy>
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                        <div className="four"></div>
                    </GhostCopy>
                    <Ghost>
                        <div className="face">
                            <div className="eye"></div>
                            <div className="eye-right"></div>
                            <div className="mouth"></div>
                        </div>
                    </Ghost>
                    <Shadow />
                </GhostContainer>
                <Bottom>
                    <p>{message}</p>
                    <ButtonGroup>
                        <button className="btn" onClick={() => navigate(-1)}>
                            Back
                        </button>
                        <button
                            className="btn"
                            onClick={() => navigate("/", { replace: true })}
                        >
                            Home
                        </button>
                    </ButtonGroup>
                </Bottom>
                <Footer>
                    <p>
                        made by{" "}
                        <a href="https://codepen.io/juliepark"> julie</a> ♡
                    </p>
                </Footer>
            </Wrapper>
        </ThemeProvider>
    );
}

export default ErrorFrame;

const scale = keyframes`
    0% {
    transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`;

const float = keyframes`
    50% {
     transform: translateY(15px);
  }
`;

const Wrapper = styled.div`
    ${(props) => css`
        height: 100vh;
        overflow: hidden;
        background-color: #6f7179;

        h1 {
            font-family: "Abril Fatface", serif;
            color: ${props.theme.$white};
            text-align: center;
            font-size: 7em;
            margin: 0;
            text-shadow: -1px 0 ${props.theme.$gray}, 0 1px ${props.theme.$gray},
                1px 0 ${props.theme.$gray}, 0 -1px ${props.theme.$gray};
        }

        h2 {
            font-family: "Lato", sans-serif;
            font-size: 2em;
            text-transform: uppercase;
            text-align: center;
            color: ${props.theme.$gray};
            margin-top: -20px;
            font-weight: 900;
        }

        p {
            text-align: center;
            font-family: "Lato", sans-serif;
            color: ${props.theme.$dark};
            font-size: 0.6em;
            margin-top: -20px;
            text-transform: uppercase;
        }
    `}
`;

const HeaderText = styled.div`
    margin: 30px 0;
`;

const GhostContainer = styled.div`
    position: relative;
    margin: 0 auto;
    width: 250px;
    height: 250px;
    margin-top: -40px;
`;

const GhostCopy = styled.div`
    position: absolute;
    background: ${({ theme }) => theme.$white};

    z-index: 0;
    width: 50%;
    height: 53%;
    left: 25%;
    top: 10%;
    border-radius: 50% 50% 0 0;
    border: 1px solid ${({ theme }) => theme.$gray};
    border-bottom: none;
    animation: ${float} 2s ease-out infinite;

    .one,
    .two,
    .three,
    .four {
        position: absolute;
        background: ${({ theme }) => theme.$white};
        top: 85%;
        width: 25%;
        height: 23%;
        border: 1px solid ${({ theme }) => theme.$gray};
        z-index: 0;
    }

    .one {
        border-radius: 0 0 100% 30%;
        left: -1px;
    }

    .two {
        left: 23%;
        border-radius: 0 0 50% 50%;
    }

    .three {
        left: 50%;
        border-radius: 0 0 50% 50%;
    }

    .four {
        left: 74.5%;
        border-radius: 0 0 30% 100%;
    }
`;

const Ghost = styled.div`
    position: absolute;
    background: ${({ theme }) => theme.$white};

    width: 50%;
    height: 53%;
    left: 25%;
    top: 10%;
    border-radius: 50% 50% 0 0;
    border: 1px solid ${({ theme }) => theme.$gray};
    border-bottom: none;
    animation: ${float} 2s ease-out infinite;

    .face {
        position: absolute;
        width: 100%;
        height: 60%;
        top: 20%;

        .eye,
        .eye-right {
            position: absolute;
            background: ${({ theme }) => theme.$dark};
            width: 13px;
            height: 13px;
            border-radius: 50%;
            top: 40%;
        }

        .eye {
            left: 25%;
        }

        .eye-right {
            right: 25%;
        }

        .mouth {
            position: absolute;
            top: 50%;
            left: 45%;
            width: 10px;
            height: 10px;
            border: 3px solid;
            border-radius: 50%;
            border-color: ${({ theme }) =>
                `transparent ${theme.$dark} ${theme.$dark} transparent`};
            transform: rotate(45deg);
        }
    }
`;

const Shadow = styled.div`
    position: absolute;
    width: 30%;
    height: 7%;
    background: ${({ theme }) => theme.$gray};
    left: 35%;
    top: 80%;
    border-radius: 50%;
    animation: ${scale} 2s infinite;
`;

const Bottom = styled.div`
    margin-top: 30px;

    & > p {
        color: ${({ theme }) => theme.$white};
        font-size: 1rem;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    & > button {
        font-family: "Lato", sans-serif;
        text-transform: uppercase;
        cursor: pointer;

        background: ${({ theme }) => theme.$white};
        padding: 15px 20px;
        margin: 5px;
        color: ${({ theme }) => theme.$dark};
        font-size: 0.6em;
        letter-spacing: 1px;
        border: 0;

        &:hover {
            background: ${({ theme }) => theme.$gray};
            transition: all 0.4s ease-out;
        }
    }
`;

const Footer = styled.footer`
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: center;
    font-size: 0.8em;
    text-transform: uppercase;
    padding: 10px;
    color: #ea7996;
    letter-spacing: 3px;
    font-family: "Lato", sans-serif;

    a {
        color: #ffffff;
        text-decoration: none;
        &:hover {
            color: #7d7d7d;
        }
    }
`;
