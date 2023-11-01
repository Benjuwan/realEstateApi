import { createContext, ReactNode, useState, FC } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";

type Default = {
    isGetFetchData: estateInfoJsonDataContents[];
    setGetFetchData: React.Dispatch<React.SetStateAction<estateInfoJsonDataContents[]>>;
    isLoading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const GetFetchDataContext = createContext({} as Default);

type fragmentType = {
    children: ReactNode;
}
export const GetFetchDataContextFragment: FC<fragmentType> = (props) => {
    const { children } = props;

    /**
     * React では参照している Context が更新された時に再レンダリングされるため、本来は機能・用途ごとにそれぞれファイルを分けて用意するべきだが今回は機能として「連携・連動している」のでまとめて記述している
    */

    /* データフェッチしたコンテンツデータの格納用配列 State */
    const [isGetFetchData, setGetFetchData] = useState<estateInfoJsonDataContents[]>([]);

    /* データフェッチ時の読み込み状態の State */
    const [isLoading, setLoading] = useState<boolean>(false);

    return (
        <GetFetchDataContext.Provider value={{
            isGetFetchData, setGetFetchData,
            isLoading, setLoading,
        }}>
            {children}
        </GetFetchDataContext.Provider>
    );
}