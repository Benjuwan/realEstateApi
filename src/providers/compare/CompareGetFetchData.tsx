import { createContext, ReactNode, useState, FC } from "react";

type Default = {
    isCompareGetFetchData: string[];
    setCompareGetFetchData: React.Dispatch<React.SetStateAction<string[]>>;
}
export const CompareGetFetchDataContext = createContext({} as Default);

type fragmentType = {
    children: ReactNode;
}
export const CompareGetFetchDataContextFragment: FC<fragmentType> = ({ children }) => {
    const [isCompareGetFetchData, setCompareGetFetchData] = useState<string[]>([]);

    return (
        <CompareGetFetchDataContext.Provider value={{ isCompareGetFetchData, setCompareGetFetchData }}>
            {children}
        </CompareGetFetchDataContext.Provider>
    );
}