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

export const FetchDataContents = memo(() => {
    const { isGetFetchData, isLoading } = useContext(GetFetchDataContext); // fetch データ
    const { isCityName } = useContext(CityName); // 都道府県・市区町村名

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
                        <div className="place">
                            <p className="DistrictName">{el.Municipality}{el.DistrictName}</p>
                            <p>￥<span className="TradePrice">{ToLocalString(el.TradePrice)}</span></p>
                        </div>
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
    font-size: 1.4rem;
    line-height: 2;
    display: flex;
    align-items: center;
    gap: 2%;
    padding: 1em;
    background-color: #eaeaea;
    border-radius: 4px;
    margin-bottom: 1em;

    & .infoBtn{
        color: #0a5e0a;
        border-color: transparent;
        background-color: #2ae72a;
        line-height: 1.4;
        text-align: center;
        padding: .25em 1em;
        border-radius: 30px;
        width: 70%;
        max-width: 240px;

        &:hover {
            border-color: #2ae72a;
            color: #2ae72a;
            background-color: #fff;
        }
    }

    & .place{
        width: 100%;
        line-height: 1.4;
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
        -webkit-backdrop-filter: blur(8px);
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

    @media screen and (min-width: 1025px) {
        font-size: 14px;
    }
}
`;