import { BallTriangle } from "react-loader-spinner";

function Loading() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#6F7179",
            }}
        >
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#F7F9FF"
                ariaLabel="ball-triangle-loading"
                visible={true}
            />
        </div>
    );
}

export default Loading;
