import { createContext, ReactNode, useState, FC } from "react";

type contextType = {
    isGetFetchPrefCode: string;
    setGetFetchPrefCode: React.Dispatch<React.SetStateAction<string>>;
}
export const GetFetchPrefCode = createContext({} as contextType);

type fragmentType = {
    children: ReactNode;
}
export const GetFetchPrefCodeFragment: FC<fragmentType> = (props) => {
    const [isGetFetchPrefCode, setGetFetchPrefCode] = useState<string>('01'); // 都道府県コードのデフォルト値は北海道（01）

    return (
        <GetFetchPrefCode.Provider value={{ isGetFetchPrefCode, setGetFetchPrefCode }}>
            {props.children}
        </GetFetchPrefCode.Provider>
    );
}