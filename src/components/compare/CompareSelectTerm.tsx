import { memo, useState, useEffect, ChangeEvent, useContext } from "react";
import { CompareSelectCity } from "./CompareSelectCity";
import { CompareSelectPref } from "./CompareSelectPref";
import { useGetTradePrice } from "../../hooks/compare/useGetTradePrice";
import { CompareGetFetchDataContext } from "../../providers/compare/CompareGetFetchData";

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
    const { isCompareGetFetchData } = useContext(CompareGetFetchDataContext);

    const { GetTradePrice } = useGetTradePrice();

    const [termLists_from, setTermLists_from] = useState<number>(startYear);
    const [termLists_to, setTermLists_to] = useState<number>(getPresentYear);

    const selectTermEvent = (
        selectEl: ChangeEvent<HTMLSelectElement>,
        setTermLists: React.Dispatch<React.SetStateAction<number>>
    ) => {
        const selectElValue: number = parseInt(selectEl.currentTarget.value);
        setTermLists((_prevTermListsValue) => selectElValue);
    }

    const action = () => {
        if (termLists_from !== termLists_to && termLists_from < termLists_to) {
            const termLists: number[] = [];
            const targetValue: number = termLists_to - termLists_from;
            for (let i = 0; i <= targetValue; i++) {
                const termValue: number = termLists_from + i;
                termLists.push(termValue);
            }

            const citySelectEl: HTMLSelectElement | null = document.querySelector('#citiesLists');
            const citySelectElValue = citySelectEl?.value;

            termLists.forEach((termEl, termNum) => {
                GetTradePrice(citySelectElValue, termEl);
                AverageCalc(termNum);
            });
        }
    }

    const AverageCalc = (termNum: number) => {
        console.log(isCompareGetFetchData);
        if (isCompareGetFetchData.length > 0) {
            // const reduceResult: string = isCompareGetFetchData.reduce((a, b) => a + b);

            // const averageNumber: number = parseInt(reduceResult) / isCompareGetFetchData.length;

            // const averageResultStr: string = `￥${String(averageNumber).toString()}`;
            // console.log(termNum, averageResultStr);
            // return averageResultStr;
        } else {
            console.log('no Result');
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
                <button type="button" onClick={action}>button</button>
            </form>
        </>
    );
});