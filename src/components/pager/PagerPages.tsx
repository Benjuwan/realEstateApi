import { useContext, useState, useEffect, useCallback, memo, FC } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { SetPagerNum } from "./setPagerNum";
import { ContentsItems } from "../ContentItmes";
import { useGetJsonData } from "../../hooks/pager/useGetJsonData";

type PagerPagesType = {
    pagerLimitMaxNum: number;
}

export const PagerPages: FC<PagerPagesType> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    /* 各種 Context */
    const { isGetFetchData, isPagers, isOffSet } = useContext(GetFetchDataContext);

    /* fetch API */
    const { GetJsonData } = useGetJsonData();
    useEffect(() => {
        GetJsonData('https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205');

        /* レンダリング時にスクロールトップ */
        window.scrollTo(0, 0);
    }, [isPagers]); // 依存配列 isPagers：ページャー数が変更される度

    /* ページャー機能：ページ送りで使用 */
    const [isPagerContents, setPagerContents] = useState<estateInfoJsonDataContents[]>([]);
    const setPagerContentsFrag = useCallback((
        fragStart: number = isPagers,
        fragFinish: number = isOffSet
    ) => {
        /* 始点：ページャー数、終点：ページャー数 + オフセット数 */
        const splicedContents: estateInfoJsonDataContents[] = [...isGetFetchData].splice(fragStart, fragFinish);
        setPagerContents(splicedContents);
    }, [isGetFetchData]); // 依存配列 isGetFetchData：コンテンツデータが取得・変更される度

    useEffect(() => {
        /* ページャー機能-A：ページ送り */
        if (typeof pagerLimitMaxNum !== "undefined") {
            const nearlyLimitRange: number = pagerLimitMaxNum - isPagers;
            if (nearlyLimitRange - isOffSet <= isOffSet) {
                console.log(isPagers, nearlyLimitRange);
                setPagerContentsFrag(isPagers, nearlyLimitRange);
            } else {
                setPagerContentsFrag();
            }
        }
    }, [isGetFetchData]); // 依存配列 isGetFetchData：コンテンツデータが取得・変更される度

    console.log(isPagerContents.length, isPagers);

    return (
        <>
            <SetPagerNum />
            {isPagerContents.map((el, i) => (
                <article key={i}>
                    <p>isPagerContents：{i + 1}</p>
                    <ContentsItems aryEl={el} />
                </article>
            ))}
        </>
    );
});