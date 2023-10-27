import { createContext, ReactNode, useState, FC } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";

type Default = {
    isGetFetchData: Array<estateInfoJsonDataContents>;
    setGetFetchData: React.Dispatch<React.SetStateAction<estateInfoJsonDataContents[]>>;
}
export const GetFetchDataContext = createContext({} as Default);

type fragmentType = {
    children: ReactNode;
}
export const GetFetchDataContextFragment: FC<fragmentType> = (props) => {
    const { children } = props;
    const [isGetFetchData, setGetFetchData] = useState<Array<estateInfoJsonDataContents>>([]);

    return (
        <GetFetchDataContext.Provider value={{ isGetFetchData, setGetFetchData }}>
            {children}
        </GetFetchDataContext.Provider>
    );
}