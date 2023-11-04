import { memo, useState, useEffect, ChangeEvent, useContext } from "react";
import { CompareLoadingState } from "../../providers/compare/CompareLoadingState";
import { CompareSelectCity } from "./CompareSelectCity";
import { CompareSelectPref } from "./CompareSelectPref";
import { useGetTradePrice } from "../../hooks/compare/useGetTradePrice";

export const CompareSelectTerm = memo(() => {
    const startYear: number = 1999;
    const getPresentYear: number = new Date().getFullYear();

    const [isSelectYears, setSelectYears] = useState<string[]>(['']);
    const selectYearsAry: string[] = [];
    for (let i = 0; i <= (getPresentYear - startYear); i++) {
        selectYearsAry.push(`${startYear + i}`);
    }
    useEffect(() => setSelectYears((_prevSelectYearsAry) => selectYearsAry), []);

    /* CompareSelectTerm 固有機能 */
    const { GetTradePrice } = useGetTradePrice();
    const { isCompareLoading } = useContext(CompareLoadingState);

    /* 計測開始・終了期間のセット State */
    const [termLists_from, setTermLists_from] = useState<number>(startYear);
    const [termLists_to, setTermLists_to] = useState<number>(getPresentYear);

    /* 計測開始・終了期間の State 更新を行う select イベント */
    const selectTermEvent = (
        selectEl: ChangeEvent<HTMLSelectElement>,
        setTermLists: React.Dispatch<React.SetStateAction<number>>
    ) => {
        const selectElValue: number = parseInt(selectEl.currentTarget.value);
        setTermLists((_prevTermListsValue) => selectElValue);
    }

    /* 計測ボタンのアクション */
    const appStart = () => {
        if (termLists_from !== termLists_to && termLists_from < termLists_to) {
            const termLists: number[] = [];
            const targetValue: number = termLists_to - termLists_from;
            for (let i = 0; i <= targetValue; i++) {
                const termValue: number = termLists_from + i;
                termLists.push(termValue);
            }

            const citySelectEl: HTMLSelectElement | null = document.querySelector('#citiesLists');
            const citySelectElValue = citySelectEl?.value;

            termLists.forEach(annualYear => {
                GetTradePrice(citySelectElValue, annualYear);
            });
        }
    }
    /* CompareSelectTerm 固有機能 */

    return (
        <>
            <CompareSelectPref />
            <CompareSelectCity />
            <form action="">
                <select name="" id="termLists_from" onChange={(selectEl: ChangeEvent<HTMLSelectElement>) => {
                    selectTermEvent(selectEl, setTermLists_from);
                }}>
                    {isSelectYears.map((optionEl, i) => (
                        <option key={i} value={optionEl}>{optionEl}</option>
                    ))}
                </select>
                <select name="" id="termLists_to" onChange={(selectEl: ChangeEvent<HTMLSelectElement>) => {
                    selectTermEvent(selectEl, setTermLists_to);
                }}>
                    {isSelectYears.map((optionEl, i) => (
                        <option key={i} value={optionEl}>{optionEl}</option>
                    ))}
                </select>
                <button type="button" disabled={isCompareLoading} onClick={appStart}>計測</button>
            </form>
        </>
    );
});