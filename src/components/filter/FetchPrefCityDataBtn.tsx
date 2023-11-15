import { FC, memo, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { useSetPrefCityData } from "../../hooks/filter/useSetPrefCityData";

type FetchPrefCityDataBtnType = {
    pagerName?: string;
}

export const FetchPrefCityDataBtn: FC<FetchPrefCityDataBtnType> = memo(({ pagerName }) => {
    /* 各種 Context */
    const { isGetFetchData, setGetFetchData, setPagers, setCurrPager } = useContext(GetFetchDataContext);

    /* 都道府県・市区町村及び計測期間に準じたデータを取得・反映する */
    const { getTerms, SetPrefCityData } = useSetPrefCityData();
    const fetchPrefCityData = () => {
        if (isGetFetchData.length > 0) setGetFetchData((_prevGetFetchData) => []); // コンテンツデータの中身を一旦リセット
        SetPrefCityData('#prefLists', '#citiesLists');
        if (pagerName !== 'mount') setPagers((_prevPagers) => 0); // 初期表示状態以外の場合はデータ取得時にページャー数をリセット
        setCurrPager((_prevCurrPager) => 1); // 表示中のページ番号をリセット
    }

    /* データ取得ボタン（.fetchPrefCityDataBtn）の disabled 関連の処理 */
    const [isBtnDisabled_term, setBtnDisabled_term] = useState<boolean>(true);
    useEffect(() => {
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
    }, [isGetFetchData]);

    return (
        <FetchPrefCityDataBtnEl type="button" disabled={isBtnDisabled_term} onClick={fetchPrefCityData}>不動産取引データを取得</FetchPrefCityDataBtnEl>
    );
});

const FetchPrefCityDataBtnEl = styled.button`
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
`;