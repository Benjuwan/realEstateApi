import { memo, FC, useState, useEffect, ChangeEvent } from "react";
import { AppStartBtn } from "./AppStartBtn";

type CompareSelectTermType = {
    isViewChart: boolean;
    setViewChart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompareSelectTerm: FC<CompareSelectTermType> = memo((props) => {
    const { isViewChart, setViewChart } = props;

    const startYear: number = 1999;
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

    /* 計測スタートボタンの disabled 関連の処理 */
    const [isAppStartBtn, setAppStartBtn] = useState<boolean>(true);
    const formEvent = (formEl: ChangeEvent<HTMLFormElement>) => {
        formEl.preventDefault();
        const termFrom: HTMLSelectElement | null = formEl.currentTarget.querySelector('#termLists_from');
        const fromValue: number = Number(termFrom?.value);
        const termTo: HTMLSelectElement | null = formEl.currentTarget.querySelector('#termLists_to');
        const toValue: number = Number(termTo?.value);

        /* 計測期間が同じでなく終了期間の方が大きい（過去 < 未来となっている）場合は disabled 解除。そうでない場合は disabled 付与 */
        if (fromValue !== toValue && fromValue < toValue) setAppStartBtn(false);
        else setAppStartBtn(true);
    }

    return (
        <>
            <form action="" className="CompareSelectTerm" onChange={(formEl: ChangeEvent<HTMLFormElement>) => {
                formEvent(formEl);
            }}>
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
                <AppStartBtn
                    isAppStartBtn={isAppStartBtn}
                    termLists_from={termLists_from}
                    termLists_to={termLists_to}
                    isViewChart={isViewChart}
                    setViewChart={setViewChart}
                />
            </form>
        </>
    );
});