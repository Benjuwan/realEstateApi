import { FC, memo } from "react";
import styled from "styled-components";
import { SelectPrefs } from "./SelectPrefs";
import { SelectCities } from "./SelectCities";
import { SelectTerm } from "./SelectTerm";
import { FetchPrefCityDataBtn } from "./FetchPrefCityDataBtn";

type SelectElsType = {
    pagerName?: string;
    isCheckSelectValue?: string;
}

export const SelectEls: FC<SelectElsType> = memo(({ pagerName, isCheckSelectValue }) => {
    return (
        <SelectElsWrapper>
            {pagerName && <p style={{ 'lineHeight': '2', 'fontWeight': 'bold' }}>{pagerName} ver</p>}
            <div className="termEls">
                <SelectPrefs />
                <SelectCities />
            </div>
            <div className="termEls">
                <SelectTerm SelectTermClassName="YearsQuarterLists_From" explainSentence="計測「開始」期間" />
                <SelectTerm SelectTermClassName="YearsQuarterLists_To" explainSentence="計測「終了」期間" />
            </div>
            <p className="termCaption"><small>※ 1:1月～3月、2:4月～6月、3:7月～10月、4:11月～12月<a href="https://www.land.mlit.go.jp/webland/api.html" target="_blank">『国土交通省　土地総合情報システム』から取得</a></small></p>
            {isCheckSelectValue !== 'mount' && <FetchPrefCityDataBtn pagerName={pagerName} />}
        </SelectElsWrapper>
    );
});

const SelectElsWrapper = styled.div`
color: #333;
background-color: #b0b0b0;
border-radius: 4px;
margin-bottom: 3em;
padding: 1em;

& .termEls{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    gap: 2%;

    &:first-of-type{
        margin-bottom: 1.5em;
        gap: 2%;
    }

    & form {
        width: 49%;

        & select {
            width: 100%;
            font-size: 16px;
        }
    }

    & .YearsQuarterLists{
        width: 49%;
        display: flex;
        flex-flow: row wrap;
        gap: 2%;

        & .explainSentence{
            font-size: 14px;
            line-height: 1.4;
            border-left: 8px solid;
            padding-left: .5em;
            margin-bottom: .5em;
        }

        & select {
            &:first-of-type{
                margin-bottom: .5em;
            }
        }
    }
}

& .termCaption{
    width: 100%;
    font-size: 12px;
    margin-bottom: 2em;

    & a {
        display: block;
        width: fit-content;
    }
}

@media screen and (min-width: 700px) {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    gap: 2%;

    & form{
        width: 23.5%;
    }
}
`;