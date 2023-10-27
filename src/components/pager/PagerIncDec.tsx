import { useContext, useEffect, useMemo, memo, FC } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { ContentsItems } from "../ContentItmes";
import { useGetJsonData } from "../../hooks/pager/useGetJsonData";

type PagerIncDecType = {
    pagerLimitMaxNum: number;
}

export const PagerIncDec: FC<PagerIncDecType> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    /* 各種 Context */
    const { isGetFetchData, isPagers, isOffSet } = useContext(GetFetchDataContext);

    /* fetch API */
    const { GetJsonData } = useGetJsonData();
    useEffect(() => {
        GetJsonData('https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205');
    }, [isPagers]); // 依存配列 isPagers：ページャー数が変更される度

    /* 初期表示用およびページャー処理後の表示用コンテンツデータを用意 */
    const theContents: estateInfoJsonDataContents[] = useMemo(() => {
        return isGetFetchData.filter((el, i) => {
            /* 初期表示（オフセット分を表示） */
            if (isPagers <= 0 && i < isOffSet) {
                return el;
            }

            /* ページャー機能-B：コンテンツデータの随時追加・削除 */
            else {
                if (typeof pagerLimitMaxNum !== "undefined") {
                    const nearlyLimitRange: number = pagerLimitMaxNum - isPagers;
                    if (nearlyLimitRange <= isOffSet) {
                        /* nearlyLimitRange（上限値近辺数値）がオフセット（次ページ表示数）より下回っている場合 */
                        const getRemandContents: number = isPagers + nearlyLimitRange;
                        if (i < getRemandContents) {
                            /* 残りのコンテンツデータ数を計算して、その分だけコンテンツデータを取得 */
                            return el;
                        }
                    } else if (i < isPagers) {
                        return el;
                    }
                }
            }
        });
    }, [isGetFetchData]); // 依存配列 isGetFetchData：コンテンツデータが取得・変更される度

    return (
        <>
            {theContents.map((el, i) => (
                <article key={i}>
                    <p>{i + 1}</p>
                    <ContentsItems aryEl={el} />
                </article>
            ))}
        </>
    );
});