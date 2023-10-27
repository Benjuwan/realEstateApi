import { createContext, ReactNode, useState, FC } from "react";

type contextType = {
    isGetFetchCityCode: string;
    setGetFetchCityCode: React.Dispatch<React.SetStateAction<string>>;
}
export const GetFetchCityCode = createContext({} as contextType);

type fragmentType = {
    children: ReactNode;
}
export const GetFetchCityCodeFragment: FC<fragmentType> = (props) => {
    /* 都道府県内市区町村一覧取得API：https://www.land.mlit.go.jp/webland/api.html */
    // 都道府県コードのデフォルト値は北海道（01）
    const [isGetFetchCityCode, setGetFetchCityCode] = useState<string>('01');

    return (
        <GetFetchCityCode.Provider value={{ isGetFetchCityCode, setGetFetchCityCode }}>
            {props.children}
        </GetFetchCityCode.Provider>
    );
}