import { createContext, ReactNode, useState, FC } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";

type Default = {
    isPagerGetFetchData: estateInfoJsonDataContents[];
    setPagerGetFetchData: React.Dispatch<React.SetStateAction<estateInfoJsonDataContents[]>>;
    isPagers: number;
    setPagers: React.Dispatch<React.SetStateAction<number>>;
    isOffSet: number;
}
export const PagerGetFetchDataContext = createContext({} as Default);

type fragmentType = {
    children: ReactNode;
}
export const PagerGetFetchDataContextFragment: FC<fragmentType> = (props) => {
    const { children } = props;
    /**
     * React では参照している Context が更新された時に再レンダリングされるため、本来は機能・用途ごとにそれぞれファイルを分けて用意するべきだが今回は機能として「連携・連動している」のでまとめて記述している
    */

    /* データフェッチしたコンテンツデータの格納用配列 State */
    const [isPagerGetFetchData, setPagerGetFetchData] = useState<estateInfoJsonDataContents[]>([]);

    /* ページャー数の管理用 State */
    const [isPagers, setPagers] = useState<number>(0); // 再レンダリングの度に引数に指定した数値が加算される

    /* ページャーの offset 値 */
    const [isOffSet] = useState<number>(10); // ※（調整不足で）5の倍数以外では「Pagination：ページャー項目クリックでページ遷移」と「InputPagerNum：ページ数入力でのページ遷移」が意図した挙動にならない

    return (
        <PagerGetFetchDataContext.Provider value={{
            isPagerGetFetchData, setPagerGetFetchData,
            isPagers, setPagers,
            isOffSet,
        }}>
            {children}
        </PagerGetFetchDataContext.Provider>
    );
}