import { createContext, Dispatch } from "react";

interface LeftMenuContextType {
    leftMenuState: boolean;
    setLeftMenuState: Dispatch<React.SetStateAction<boolean>>;
}

const LeftMenuContext = createContext<LeftMenuContextType>({
    leftMenuState: false,
    setLeftMenuState: () => {},
});

export default LeftMenuContext;
