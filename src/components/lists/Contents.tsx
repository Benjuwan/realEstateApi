import { memo, useContext, useEffect, useMemo, FC, useState } from "react";
import styled from "styled-components";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/lists/GetFetchData";
import { useGetJsonData } from "../../hooks/lists/useGetJsonData";

type ContentsProps = {
    pagerLimitMaxNum?: number;
}

export const Contents: FC<ContentsProps> = memo((props) => {
    const { pagerLimitMaxNum } = props;
    const { isGetFetchData, isPagers, isOffSet } = useContext(GetFetchDataContext);
    const [isIndexNumStr, setIsIndexNumStr] = useState<boolean>(true);

    /* 都道府県内市区町村一覧取得API：https://www.land.mlit.go.jp/webland/api.html */
    const { GetJsonData } = useGetJsonData();
    useEffect(() => {
        /* 大阪府（27）の市区町村コード一覧：https://www.land.mlit.go.jp/webland/api/CitySearch?area=27 */
        // 大阪府全域：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20151&to=20152&area=27

        // 吹田市：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205
        GetJsonData(`https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205`);

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
            }

            /* ページャー処理後-A（コンテンツデータを【差し替えて】いくver）*/
            else {
                if (isPagers <= isOffSet) {
                    // ページャー数がオフセットを下回っている場合は初期表示と同じ処理
                    if (i < isOffSet) {
                        return el;
                    }
                } else if (isPagers < i && i <= (isPagers + isOffSet)) {
                    // 始点：ページャー数、終点：ページャー数 + オフセット数
                    if (typeof pagerLimitMaxNum !== "undefined") {
                        const nearlyLimitRange: number = pagerLimitMaxNum - isPagers;
                        if (nearlyLimitRange - isOffSet <= isOffSet) {
                            console.log(isPagers, nearlyLimitRange);
                            if (isPagers < i && i <= pagerLimitMaxNum) {
                                return el;
                            }
                        } else {
                            return el;
                        }
                    }
                }
            }

            /* ページャー処理後-B（コンテンツデータを【追加・削除して】いくver）*/
            // else {
            //     setIsIndexNumStr(false);
            //     if (typeof pagerLimitMaxNum !== "undefined") {
            //         const nearlyLimitRange: number = pagerLimitMaxNum - isPagers;
            //         if (nearlyLimitRange <= isOffSet) {
            //             /* nearlyLimitRange（上限値近辺数値）がオフセット（次ページ表示数）より下回っている場合 */
            //             const getRemandContents: number = isPagers + nearlyLimitRange;
            //             if (i < getRemandContents) {
            //                 /* 残りのコンテンツデータ数を計算して、その分だけコンテンツデータを取得 */
            //                 return el;
            //             }
            //         } else if (i < isPagers) {
            //             return el;
            //         }
            //     }
            // }
        });
    }, [isGetFetchData]); // 依存配列 isGetFetchData：コンテンツデータが取得・変更される度

    /* fee を3桁区切りに */
    const toLocaleString = (targetWords: string) => parseInt(targetWords).toLocaleString();

    return (
        <>
            <p style={{ 'fontSize': '16px', 'textAlign': 'center', 'marginBottom': '1em' }}>{isPagers === 0 ? isPagers + isOffSet : isPagers}件 / {pagerLimitMaxNum}</p>
            <ContentWrapper>
                {theContents.map((el, i) => (
                    <ContentItems key={i}>
                        {isIndexNumStr || <p>{i + 1}</p>}
                        <div className="boxes categories">
                            <h2 className="type">{el.Type}</h2>
                            <p className="Prefecture">{el.Prefecture}</p>
                            {el.Direction && <p className="direction">{el.Direction}</p>}
                        </div>
                        <div className="boxes infos">
                            <p className="used">用途：{el.Use}</p>
                            <p className="fee">￥{toLocaleString(el.TradePrice)}</p>
                            <p className="districtName">{el.Prefecture}<span>{el.Municipality}</span><span>{el.DistrictName}</span></p>
                            <p className="buildingYear">{el.BuildingYear}</p>
                            <p className="floorPlan">{el.FloorPlan}</p>
                            <p className="area">面積（平方メートル）：{el.Area}</p>
                            <p className="structure">{el.Structure}</p>
                            <p className="renovation">{el.Renovation}</p>
                        </div>
                        <div className="boxes otherInfo">
                            <p className="purpose">目的：{el.Purpose}</p>
                            <p className="period">取引時点：{el.Period}</p>
                            <p className="type">取引の種類：{el.Type}<span>{el.CityPlanning}</span></p>
                            <p className="municipalityCode">市区町村コード：{el.MunicipalityCode}</p>
                            <p className="floorAreaRatio">容積率（％）：{el.FloorAreaRatio}</p>
                            <p className="coverageRatio">建ぺい率（％）：{el.CoverageRatio}</p>
                        </div>
                    </ContentItems>
                ))}
            </ContentWrapper>
        </>
    );
});

const ContentWrapper = styled.div`
width: clamp(320px, 100%, 640px);
margin: auto;
font-size: 1.6rem;

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

const ContentItems = styled.article`
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
`;