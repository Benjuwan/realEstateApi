import { memo, useState } from "react";
import styled from "styled-components";
import { SelectPrefs } from "../filter/SelectPrefs";
import { SelectCities } from "../filter/SelectCities";
import { CompareSelectTerm } from "./CompareSelectTerm";
import { CompareSortListsViewGraph } from "./CompareSortListsViewGraph";

export const CompareComponent = memo(() => {
    /* chart コンポーネント表示判定用の State */
    const [isViewChart, setViewChart] = useState<boolean>(false);

    return (
        <CompareComponentEl>
            <div className="selectElsWrapper">
                <div className="selectEls">
                    <SelectPrefs />
                    <SelectCities />
                    <CompareSelectTerm isViewChart={isViewChart} setViewChart={setViewChart} />
                </div>
                <div className="explain">
                    <p>指定された<b>場所</b>と<b>計測期間</b>における<b>不動産取引の年間平均取引価格</b>（*1）を確認できます。（*1：1～4の四半期通年の平均取引価格）</p>
                </div>
                <ul className="explainLists">
                    <li>1：データ取得を希望する都道府県と市区町村、計測年数を指定して「計測スタート」ボタンを押してください。※計測結果は随時追加されていきます。</li>
                    <li>2：「ソート&amp;グラフを表示」ボタンを押すと取得データがソート及びグラフ表示されます。</li>
                </ul>
            </div>
            <p id="prefCityName"></p>
            <CompareSortListsViewGraph isViewChart={isViewChart} setViewChart={setViewChart} />
        </CompareComponentEl>
    );
});

const CompareComponentEl = styled.div`
/* padding: 2.5em; */
width: clamp(320px, 100%, 960px);
margin: auto;

& button {
    cursor: pointer;
    appearance: none;
    line-height: 2;
    border-radius: 4px;
    border: 1px solid transparent;
    color: #fff;
    background-color: #333;
    padding: 0 1em;

    &[disabled] {
        cursor: default;
        background-color: #f0f0f0;
        color: #bebebe;
    }

    &:not([disabled]):hover {
        background-color: #fff;
        border-color: #333;
        color: #333;
    }
}

& #prefCityName {
    font-size: 1.6rem;
    margin-bottom: 1em;

    & span {
        font-weight: bold;
    }

    @media screen and (min-width: 1025px) {
        font-size: 16px;
    }
}

& .selectElsWrapper{
    border-radius: 4px;
    background-color: #b0b0b0;
    padding: 1em;
    margin-bottom: 1em;
    font-size: 1.4rem;

    & .selectEls {
        margin-bottom: 1em;

        & form {
            & select {
                width: clamp(80px, 100%, 640px);
                margin-bottom: .5em;
            }
            
            &.CompareSelectTerm {
                width: clamp(80px, 100%, 640px);
                display: flex;
                flex-flow: row wrap;
                gap: 2%;
                
                & select {
                    width: 49%;
                }

                & button {
                    width: 100%;
                }
            }
        }
    }

    & .explain {
        margin-bottom: 1em;
        line-height: 2;
    }

    & .explainLists {
        list-style: none;

        & li {
            text-indent: -1.5em;
            padding-left: 1.5em;
        }
    }

    @media screen and (min-width: 700px) {
        display: flex;
        flex-flow: row wrap;
        gap: 4%;

        & .selectEls {
            width: 40%;
        }

        & .explain {
            width: 56%;
        }

        & .explainLists {
            width: 100%;
        }
    }

    @media screen and (min-width: 1025px) {
        font-size: 14px;
    }
}
`;