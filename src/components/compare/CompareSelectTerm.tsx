import { memo, useState, useEffect, ChangeEvent } from "react";
import { AppStartBtn } from "./AppStartBtn";

export const CompareSelectTerm = memo(() => {
    const startYear: number = 1990;
    const getPresentYear: number = new Date().getFullYear();

    const [isSelectYears, setSelectYears] = useState<string[]>(['']);
    const selectYearsAry: string[] = [];
    for (let i = 0; i <= (getPresentYear - startYear); i++) {
        selectYearsAry.push(`${startYear + i}`);
    }
    useEffect(() => setSelectYears((_prevSelectYearsAry) => selectYearsAry), []);

    /* CompareSelectTerm 固有機能 */
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

    return (
        <>
            <form action="" className="CompareSelectTerm">
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
                <AppStartBtn termLists_from={termLists_from} termLists_to={termLists_to} />
            </form>
        </>
    );
});