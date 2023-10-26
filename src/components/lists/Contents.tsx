import { memo, useContext, useEffect, useMemo, FC, useState, useCallback } from "react";
import styled from "styled-components";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/lists/GetFetchData";
import { SetPagerNum } from "./setPagerNum";
import { ContentsItems } from "../ContentItmes";
import { useGetJsonData } from "../../hooks/lists/useGetJsonData";

type ContentsProps = {
    pagerLimitMaxNum?: number;
}

export const Contents: FC<ContentsProps> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    /* ページャー切替：A-ページ送り（true）、B-コンテンツデータの随時追加・削除（false）*/
    const [isPagerAction] = useState<boolean>(true);

    const { isGetFetchData, isPagers, isOffSet } = useContext(GetFetchDataContext);

    /* index 番号の表示（テスト：コンテンツデータ数の確認用）*/
    const [isIndexNumStr, setIsIndexNumStr] = useState<boolean>(true);

    /* ページャー機能：ページ送りで使用 */
    const [isPagerContents, setPagerContents] = useState<estateInfoJsonDataContents[]>([]);
    const setPagerContentsFrag = useCallback((
        fragStart: number = isPagers,
        fragFinish: number = isOffSet
    ) => {
        /* 始点：ページャー数、終点：ページャー数 + オフセット数 */
        const splicedContents: estateInfoJsonDataContents[] = [...isGetFetchData].splice(fragStart, fragFinish);
        setPagerContents(splicedContents);
    }, [isGetFetchData]);

    /* 都道府県内市区町村一覧取得API：https://www.land.mlit.go.jp/webland/api.html */
    const { GetJsonData } = useGetJsonData();
    useEffect(() => {
        /* 大阪府（27）の市区町村コード一覧：https://www.land.mlit.go.jp/webland/api/CitySearch?area=27 */
        // 大阪府全域：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20151&to=20152&area=27

        // 吹田市：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205
        GetJsonData('https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205');

        /* レンダリング時にスクロールトップ */
        if (isIndexNumStr) {
            window.scrollTo(0, 0);
        }
    }, [isPagers]); // 依存配列 isPagers：ページャー数が変更される度

    /* 初期表示用およびページャー処理後の表示用コンテンツデータを用意 */
    const theContents: estateInfoJsonDataContents[] = useMemo(() => {
        return isGetFetchData.filter((el, i) => {
            /* 初期表示（オフセット分を表示） */
            if (isPagers <= 0 && i < isOffSet) {
                return el;
            } else if (isPagerAction) {
                /* ページャー処理後-A（コンテンツデータを【差し替えて】いくver）*/
                if (isPagers > 0) {
                    if (isPagers <= 5) {
                        setPagerContentsFrag(0);
                    } else {
                        if (typeof pagerLimitMaxNum !== "undefined") {
                            const nearlyLimitRange: number = pagerLimitMaxNum - isPagers;
                            if (nearlyLimitRange - isOffSet <= isOffSet) {
                                console.log(isPagers, nearlyLimitRange);
                                setPagerContentsFrag(isPagers, nearlyLimitRange);
                            } else {
                                setPagerContentsFrag();
                            }
                        }
                    }
                }
            } else {
                /* ページャー処理後-B（コンテンツデータを【追加・削除して】いくver）*/
                setIsIndexNumStr(false);
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
            <p style={{ 'fontSize': '16px', 'textAlign': 'center', 'marginBottom': '1em' }}>{isPagers === 0 ? isPagers + isOffSet : isPagers}件 / {pagerLimitMaxNum}</p>
            <SetPagerNum />
            <ContentWrapper>
                {isPagerContents.length > 0 ?
                    isPagerContents.map((el, i) => (
                        <article key={i}>
                            {isIndexNumStr || <p>isPagerContents：{i + 1}</p>}
                            <ContentsItems aryEl={el} />
                        </article>
                    )) :
                    theContents.map((el, i) => (
                        <article key={i}>
                            {isIndexNumStr || <p>{i + 1}</p>}
                            <ContentsItems aryEl={el} />
                        </article>
                    ))
                }
            </ContentWrapper>
        </>
    );
});

const ContentWrapper = styled.div`
width: clamp(320px, 100%, 640px);
margin: auto;
font-size: 1.6rem;

& article {
    border-radius: 4px;
    padding: 1em;
    background-color: #eaeaee;
    margin-bottom: 4em;

    & .boxes{
        margin-bottom: 1em;
    }

    & .categories{
        display: flex;
        align-items: center;
        gap: 2%;
        line-height: 2;
        color: #fff;
        
        & h2,
        & p{
            margin: 0;
            font-size: 14px;
            padding: .25em 1em;
            border-radius: 30px;
            background-color: limegreen;
            text-align: center;
        }

        & p{
            background-color: #333;
        }
    }

    & .infos,
    & .otherInfo{
        line-height: 1.8;
        font-size: 16px;
        
        & p{
            margin: 0;
            border-left: 5px solid #333;
            padding-left: .5em;

            &:not(:last-of-type){
                margin-bottom: 1em;
            }

            & span{
                margin: 0 .5em;
            }
        }
    }

    & .infos{
        border-bottom: 1px solid #333;
        padding-bottom: 1em;
    }
    & .otherInfo{
        margin: 0;
    }

    @media screen and (min-width: 700px) {
        display: flex;
        flex-flow: row wrap;
        gap: 2%;
        width: 48%;

        & .boxes{
            width: 48%;
        }

        & .categories{
            width: 100%;
            margin-bottom: 1em;
        }

        & .infos{
            border-bottom: none;
            padding: 0;
        }
    }

    @media screen and (min-width: 1025px) {
        width: 32%;
    }
}

@media screen and (min-width: 700px) {
    display: flex;
    flex-flow: row wrap;
    gap: 2%;
    justify-content: space-between;
}

@media screen and (min-width: 1025px) {
    width: clamp(320px, 100%, 1280px);
    font-size: 16px;
}
`;