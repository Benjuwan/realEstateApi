import { createContext, ReactNode, useState, FC } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";

type Default = {
    isGetFetchData: Array<estateInfoJsonDataContents>;
    setGetFetchData: React.Dispatch<React.SetStateAction<estateInfoJsonDataContents[]>>;
    isPagers: number;
    setPagers: React.Dispatch<React.SetStateAction<number>>;
    isOffSet: number;
}
export const GetFetchDataContext = createContext({} as Default);

type fragmentType = {
    children: ReactNode;
}
export const GetFetchDataContextFragment: FC<fragmentType> = (props) => {
    const { children } = props;

    /**
     * 参照している Context が更新された時に再レンダリングされるため、本来は機能・用途ごとにそれぞれ分けて用意するべきだが今回は機能として「連携・連動している」のでまとめて記述している
    */

    /* データフェッチしたコンテンツデータの格納用配列 State */
    const [isGetFetchData, setGetFetchData] = useState<Array<estateInfoJsonDataContents>>([]);

    /* ページャー数の管理用 State */
    const [isPagers, setPagers] = useState<number>(0); // 再レンダリングの度に引数に指定した数値が加算される

    /* ページャーの offset 値 */
    const [isOffSet] = useState<number>(10);

    return (
        <GetFetchDataContext.Provider value={{
            isGetFetchData, setGetFetchData,
            isPagers, setPagers,
            isOffSet,
        }}>
            {children}
        </GetFetchDataContext.Provider>
    );
}