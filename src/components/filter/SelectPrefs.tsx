import { ChangeEvent, useEffect, useRef, useState, memo, useContext } from "react";
import styled from "styled-components";
import { GetFetchPrefCode } from "../../providers/filter/GetFetchPrefCode";
import { SelectCities } from "./SelectCities";
import { SelectTerm } from "./SelectTerm";
import { useSetPrefCityData } from "../../hooks/filter/useSetPrefCityData";

export const SelectPrefs = memo(() => {
    /* 都道府県コード （useGetJsonDataXai.ts にて使用） */
    const { setGetFetchPrefCode } = useContext(GetFetchPrefCode);

    /* 都道府県・市区町村及び計測期間に準じたデータを取得・反映する */
    const { getTerms, SetPrefCityData } = useSetPrefCityData();
    const fetchPrefCityData = () => {
        SetPrefCityData('#prefLists', '#citiesLists');
    }

    /* データ取得ボタン（.fetchPrefCityDataBtn）の disabled 関連の処理 */
    const [isBtnDisabled_term, setBtnDisabled_term] = useState<boolean>(true);

    const refFormSelectElValue = useRef<HTMLFormElement | null>(null);
    const get_SelectElValue_CityCode = () => {
        /* form 要素を親に持っていないと下記の記述（ParentEl.querySelector('select')?.value）は不可能 */
        const formSelectEl: HTMLSelectElement | null | undefined = refFormSelectElValue.current?.querySelector('#prefLists');
        const formSelectElValue: string | undefined = formSelectEl?.value;
        if (typeof formSelectElValue !== "undefined") {
            setGetFetchPrefCode((_prevPrefCode) => formSelectElValue); // 都道府県コードをセット
        }
    }

    const PrefName: string = '北海道,青森県,岩手県,宮城県,秋田県,山形県,福島県,茨城県,栃木県,群馬県,埼玉県,千葉県,東京都,神奈川県,新潟県,富山県,石川県,福井県,山梨県,長野県,岐阜県,静岡県,愛知県,三重県,滋賀県,京都府,大阪府,兵庫県,奈良県,和歌山県,鳥取県,島根県,岡山県,広島県,山口県,徳島県,香川県,愛媛県,高知県,福岡県,佐賀県,長崎県,熊本県,大分県,宮崎県,鹿児島県,沖縄県';
    const PrefNameAry: Array<string> = PrefName.split(',');

    useEffect(() => {
        /* Strict mode では2回レンダリングされるので option が重複する */
        const selectEl = document.querySelector('#prefLists');
        for (let i = 1; i <= 47; i++) {
            if (i < 10) {
                selectEl?.insertAdjacentHTML('beforeend', `<option value=0${i}>${PrefNameAry[i - 1]}</option>`);
            } else {
                selectEl?.insertAdjacentHTML('beforeend', `<option value=${i}>${PrefNameAry[i - 1]}</option>`);
            }
        }

        /* データ取得ボタン（.fetchPrefCityDataBtn）の disabled 関連の処理 */
        const YearsQuarterLists_SelectEls: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.YearsQuarterLists select');
        YearsQuarterLists_SelectEls.forEach(selectEl => {
            selectEl.addEventListener('change', () => {
                const fromValue: number = getTerms('.YearsQuarterLists_From');
                const toValue: number = getTerms('.YearsQuarterLists_To');
                if (fromValue === toValue || fromValue > toValue) {
                    /* 値が同じ or 計測開始の方が計測終了より大きい場合 */
                    setBtnDisabled_term(true);
                } else {
                    setBtnDisabled_term(false);
                }
            });
        });
    }, []);

    return (
        <SelectEls>
            <div className="termEls">
                <form action="" ref={refFormSelectElValue} onChange={(el: ChangeEvent<HTMLFormElement>) => {
                    el.preventDefault();
                    get_SelectElValue_CityCode();
                }}>
                    <select name="" id="prefLists"></select>
                </form>
                <SelectCities />
            </div>
            <div className="termEls">
                <SelectTerm SelectTermClassName="YearsQuarterLists_From" explainSentence="計測「開始」期間" />
                <SelectTerm SelectTermClassName="YearsQuarterLists_To" explainSentence="計測「終了」期間" />
            </div>
            <p className="termCaption"><small>※ 1:1月～3月、2:4月～6月、3:7月～10月、4:11月～12月<a href="https://www.land.mlit.go.jp/webland/api.html" target="_blank">『国土交通省　土地総合情報システム』から取得</a></small></p>
            <button type="button" disabled={isBtnDisabled_term} className="fetchPrefCityDataBtn" onClick={fetchPrefCityData}>不動産取引データを取得</button>
        </SelectEls>
    );
});

const SelectEls = styled.div`
margin-bottom: 3em;
color: #333;
background-color: #b0b0b0;
padding: 1em;
border-radius: 4px;

& .termEls{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    gap: 10%;

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
        width: 45%;
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

& .fetchPrefCityDataBtn{
    display: block;
    appearance: none;
    cursor: pointer;
    width: clamp(120px, 100%, 240px);
    margin: auto;
    background-color: #333;
    color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    line-height: 2;

    &:disabled{
        cursor: default;
        background-color: #eaeaea;
        color: #dadada;
    }

    &:not([disabled]):hover{
        background-color: #fff;
        color: #333;
        border-color: #333;
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