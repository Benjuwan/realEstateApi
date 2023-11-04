import { createContext, ReactNode, useState, FC } from "react";

type Default = {
    isCompareLoading: boolean;
    setCompareLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CompareLoadingState = createContext({} as Default);

type fragmentType = {
    children: ReactNode;
}
export const CompareLoadingStateFragment: FC<fragmentType> = ({ children }) => {
    const [isCompareLoading, setCompareLoading] = useState<boolean>(false);

    return (
        <CompareLoadingState.Provider value={{
            isCompareLoading, setCompareLoading
        }}>
            {children}
        </CompareLoadingState.Provider>
    );
}