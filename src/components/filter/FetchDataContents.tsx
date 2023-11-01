import { memo, useContext, useEffect } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { CityName } from "../../providers/filter/CityName";
import { FetchDataResetRenderContext } from "../../providers/filter/FetchDataResetRender";
import { FilterContentsCatClick } from "./FilterContentsCatClick";
import { AverageNumber } from "./AverageNumber";
import { ContentsItems } from "../ContentItmes";
import { useGetJsonDataXai } from "../../hooks/filter/useGetJsonDataXai";

export const FetchDataContents = memo(() => {
    const { isGetFetchData, isLoading } = useContext(GetFetchDataContext); // fetch データ
    const { isCityName } = useContext(CityName); // 都道府県・市区町村名

    /* fetch API：デフォルト（大阪府吹田市）設定を初期表示したい場合は isFetchDataResetRender を依存配列にした useEffect 部分のコメントアウトを外す */
    const { isFetchDataResetRender } = useContext(FetchDataResetRenderContext); // fetch データのリセット
    const { GetJsonDataXai } = useGetJsonDataXai();
    // useEffect(() => GetJsonDataXai(), [isFetchDataResetRender]);

    /* 詳細情報の表示機能（モーダル） */
    const OnViewDetails = (targetViewElm: HTMLElement) => {
        const detailsContent = targetViewElm.parentElement?.querySelector('.details');
        if (detailsContent?.classList.contains('OnView')) {
            detailsContent.classList.remove('OnView');
        } else {
            detailsContent?.classList.add('OnView');
        }
    }

    return (
        <>{isLoading ? <p>...now loading</p> :
            <>
                {isGetFetchData.length > 0 && <h2 style={{ 'fontSize': '20px', 'textAlign': 'center' }}>{isCityName && <>「{isCityName}」の</>}平均取引価格「<AverageNumber />」</h2>}
                <p>件数：{isGetFetchData.length}</p>
                {isGetFetchData.map((el, i) => (
                    <EachContents className="contents" key={i}>
                        <FilterContentsCatClick aryEl={el} classNameStr="infoBtn" />
                        <p className="TradePrice">{el.TradePrice}</p>
                        <button type="button" onClick={((btnEl) => {
                            OnViewDetails(btnEl.currentTarget);
                        })}>詳細</button>
                        <div className="details" onClick={((divEl) => {
                            OnViewDetails(divEl.currentTarget);
                        })}>
                            <div className="contentsWrapper">
                                <ContentsItems aryEl={el} />
                            </div>
                        </div>
                    </EachContents>))}
            </>
        }
        </>
    );
});

const EachContents = styled.div`
&.contents{
    font-size: 16px;
    line-height: 2;
    display: flex;
    align-items: center;
    gap: 2%;
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
        background-color: rgba(255,255,255,.25);
        backdrop-filter: blur(8px);

        &.OnView{
            overflow: auto;
            visibility: visible;
            height: 100%;
            z-index: 1;
        }

        & .contentsWrapper{
            overflow-y: scroll;
            background-color: #fff;
            box-shadow: inset 0 0 8px rgba(0,0,0,.5);
            border-radius: 4px;
            padding: 1.25em;
            
            & div{
                margin: 0;
                padding: 0;
            }

            & p {
                &::before{
                    content: "・";
                }
            }
        }
    }
}
`;