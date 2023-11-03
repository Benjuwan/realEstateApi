import { memo, useContext } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { CityName } from "../../providers/filter/CityName";
import { LoadingEl } from "./LoadingEl";
import { FilterContentsCatClick } from "./FilterContentsCatClick";
import { FilterActionBtns } from "./FilterActionBtns";
import { AverageNumber } from "./AverageNumber";
import { ContentsItems } from "../ContentItmes";
import { useToLocalString } from "../../hooks/useToLocalString";

/* デフォルト（大阪府吹田市）設定を初期表示したい場合に以下を使用 */
// import { FetchDataResetRenderContext } from "../../providers/filter/FetchDataResetRender";
// import { useGetJsonDataXai } from "../../hooks/filter/useGetJsonDataXai";

export const FetchDataContents = memo(() => {
    const { isGetFetchData, isLoading } = useContext(GetFetchDataContext); // fetch データ
    const { isCityName } = useContext(CityName); // 都道府県・市区町村名

    /* fetch API：デフォルト（大阪府吹田市）設定を初期表示したい場合は isFetchDataResetRender を依存配列にした useEffect 部分のコメントアウトを外す */
    // const { isFetchDataResetRender } = useContext(FetchDataResetRenderContext); // fetch データのリセット
    // const { GetJsonDataXai } = useGetJsonDataXai();
    // useEffect(() => GetJsonDataXai(), [isFetchDataResetRender]);

    /* fee を3桁区切りに */
    const { ToLocalString } = useToLocalString();

    /* 詳細情報の表示機能（モーダル） */
    const OnViewDetails = (targetViewElm: HTMLElement) => {
        const detailsContent = targetViewElm.parentElement?.querySelector('.details');
        if (detailsContent?.classList.contains('OnView')) {
            detailsContent.classList.remove('OnView');
        } else {
            detailsContent?.classList.add('OnView');
        }
    }

    /* h2 のスタイル */
    const headingStyle: object = {
        'fontSize': '18px',
        'textAlign': 'center',
        'fontWeight': 'normal',
        'marginBottom': '1em'
    }

    return (
        <>{isLoading ? <LoadingEl /> :
            <>
                {isGetFetchData.length > 0 &&
                    <>
                        <FilterActionBtns />
                        <h2 style={headingStyle}>{isCityName && <>「{isCityName}」の</>}平均取引価格「<AverageNumber />」</h2>
                        <p>件数：{isGetFetchData.length}</p>
                    </>
                }
                {isGetFetchData.map((el, i) => (
                    <EachContents className="contents" key={i}>
                        <FilterContentsCatClick aryEl={el} classNameStr="infoBtn" />
                        <p>￥<span className="TradePrice">{ToLocalString(el.TradePrice)}</span></p>
                        <button type="button" className="detailsViewBtn" onClick={((btnEl) => {
                            OnViewDetails(btnEl.currentTarget);
                        })}>詳細情報</button>
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
        color: #0a5e0a;
        border-color: transparent;
        background-color: #2ae72a;
        text-align: center;
        padding: .25em 1em;
        border-radius: 30px;
        width: 50%;

        &:hover {
            border-color: #2ae72a;
            color: #2ae72a;
            background-color: #fff;
        }
    }

    & .detailsViewBtn{
        width: 100%;
        max-width: 240px;
        background-color: #0a5e0a;
        border: 1px solid transparent;
        color: #fff;

        &:hover{
            border-color: #0a5e0a;
            color: #0a5e0a;
            background-color: #fff;
        }
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