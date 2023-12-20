import { isRouteErrorResponse, useRouteError } from "react-router";
import ErrorFrame from "./ErrorFrame";

type ErrorResponse = {
    data:
        | {
              status_code: number;
              status_message: string;
              success: boolean;
          }
        | string;
    status: number;
    statusText?: string;
    message?: string;
};

const errorCheck = (error: ErrorResponse): error is ErrorResponse => {
    return "data" in error && "status" in error;
};

function ErrorBoundary() {
    const error = useRouteError() as ErrorResponse;

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <ErrorFrame
                    stateCode={error.status}
                    subTitle="페이지를 찾을 수 없습니다."
                    message="없는 페이지 임으로 홈으로 이동하시거나 뒤로가기 버튼을 클릭하세요!"
                />
            );
        }
    } else if (errorCheck(error)) {
        if (error.status === 404) {
            return (
                <ErrorFrame
                    stateCode={error.status}
                    subTitle="페이지를 찾을 수 없습니다."
                    message="없는 페이지 임으로 홈으로 이동하시거나 뒤로가기 버튼을 클릭하세요!"
                />
            );
        }

        if (error.status === 401) {
            return (
                <ErrorFrame
                    stateCode={error.status}
                    subTitle="로그인 인증 에러가 발생하였습니다."
                    message="유효하지 않은 로그인 정보임으로 다시 로그인해주세요!"
                />
            );
        }

        if (error.status === 503) {
            return (
                <ErrorFrame
                    stateCode={error.status}
                    subTitle="서버 에러가 발생하였습니다."
                    message="새로고침하시거나 이런 현상이 지속적으로 발생하면 관리자에게 문의해주세요!"
                />
            );
        }
    }

    if (error.status === 404) {
        return (
            <ErrorFrame
                stateCode={error.status}
                subTitle="페이지를 찾을 수 없습니다."
                message="없는 페이지 임으로 홈으로 이동하시거나 뒤로가기 버튼을 클릭하세요!"
            />
        );
    }

    return (
        <ErrorFrame
            stateCode="Unknown"
            subTitle="알 수 없는 에러"
            message="새로고침하시거나 이런 현상이 지속적으로 발생하면 관리자에게 문의해주세요!"
        />
    );
}

export default ErrorBoundary;
