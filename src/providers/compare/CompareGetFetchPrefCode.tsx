import { createContext, ReactNode, useState, FC } from "react";

type contextType = {
    isGetFetchPrefCode: string;
    setGetFetchPrefCode: React.Dispatch<React.SetStateAction<string>>;
}
export const CompareGetFetchPrefCode = createContext({} as contextType);

type fragmentType = {
    children: ReactNode;
}
export const CompareGetFetchPrefCodeFragment: FC<fragmentType> = (props) => {
    const [isGetFetchPrefCode, setGetFetchPrefCode] = useState<string>('01'); // 都道府県コードのデフォルト値は北海道（01）

    return (
        <CompareGetFetchPrefCode.Provider value={{ isGetFetchPrefCode, setGetFetchPrefCode }}>
            {props.children}
        </CompareGetFetchPrefCode.Provider>
    );
}