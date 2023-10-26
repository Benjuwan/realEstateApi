import { useContext, useEffect, memo } from "react";
import styled from "styled-components";
import { CityName } from "../../providers/compare/CityName";
import { GetFetchDataContext } from "../../providers/compare/GetFetchData";
import { FetchDataResetRenderContext } from "../../providers/compare/FetchDataResetRender";
import { AverageNumber } from "./AverageNumber";
import { ContentsItems } from "../ContentItmes";
import { FilterActionBtns } from "./FilterActionBtns";
import { FilterContentsCatClick } from "./FilterContentsCatClick";
import { useGetJsonData } from "../../hooks/compare/useGetJsonData";

/* 都道府県から市区町村コードを取得して表示（データフェッチ）したいが未実装 */
import { SelectPrefs } from "./SelectPrefs";

export const CompareComponent = memo(() => {
    const { isGetFetchData } = useContext(GetFetchDataContext);
    const { isFetchDataResetRender } = useContext(FetchDataResetRenderContext);
    const { isCityName } = useContext(CityName);

    const { GetJsonData } = useGetJsonData();
    useEffect(() => {
        GetJsonData(`https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205`);
    }, [isFetchDataResetRender]);

    // 詳細情報の表示機能（モーダル）
    const OnViewDetails = (el: HTMLElement) => {
        const detailsContent = el.parentElement?.querySelector('.details');
        if (detailsContent?.classList.contains('OnView')) {
            detailsContent.classList.remove('OnView');
        } else {
            detailsContent?.classList.add('OnView');
        }
    }

    return (
        <Contents>
            <h2>「{isCityName}」の平均取引価格「<AverageNumber />」</h2>
            <p>件数：{isGetFetchData.length}</p>
            <SelectPrefs />
            <FilterActionBtns />
            {isGetFetchData.map((el, i) => (
                <div className="contents" key={i}>
                    <FilterContentsCatClick aryEl={el} classNameStr="infoBtn" />
                    <p className="TradePrice">{el.TradePrice}</p>
                    <button type="button" onClick={((btnEl) => {
                        OnViewDetails(btnEl.currentTarget);
                    })}>詳細</button>
                    <div className="details" onClick={((divEl) => {
                        OnViewDetails(divEl.currentTarget);
                    })}>
                        <ContentsItems aryEl={el} />
                    </div>
                </div>
            ))}
        </Contents>
    );
});

const Contents = styled.div`
width: clamp(320px, 100%, 640px);
margin: auto;

& button {
    cursor: pointer;
    appearance: none;
    border-radius: 4px;
    background-color: transparent;
    border: 1px solid;
    width: 100%;
}

& h2 {
    font-size: 20px;
    text-align: center;
}

& .btns {
    margin-bottom: 2em;
    display: flex;
    justify-content: space-between;
    background-color: #dadada;
    padding: 1em 3em;
    border-radius: 4px;
    gap: 5%;
}

& .contents{
    font-size: 16px;
    line-height: 2;
    display: flex;
    align-items: center;
    gap: 2%;
    margin-bottom: 1em;
    padding: 1em;
    background-color: #eaeaea;
    border-radius: 4px;

    & .infoBtn{
        color: #fff;
        background-color: limegreen;
        text-align: center;
        padding: .25em 1em;
        border-radius: 30px;
        width: 50%;
    }

    & .details{
        width: 100%;
        position: fixed;
        inset: 0;
        margin: auto;
        display: grid;
        padding: 5em calc(100vw/8);
        overflow-x: scroll;
        overflow: hidden;
        visibility: hidden;
        height: 0;
        background-color: rgba(255,255,255,.75);
        backdrop-filter: blur(8px);

        &.OnView{
            overflow: auto;
            visibility: visible;
            height: 100%;
            z-index: 1;
        }

        & p {
            &::before{
                content: "・";
            }
        }
    }
}
`;
