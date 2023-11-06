import { FC, memo, useState, useEffect } from "react"

type SelectTermType = {
    SelectTermClassName: string;
    explainSentence?: string;
}

export const SelectTerm: FC<SelectTermType> = memo(({ SelectTermClassName, explainSentence }) => {
    const startYear: number = 1999;
    const getPresentYear: number = new Date().getFullYear();

    const [isSelectYears, setSelectYears] = useState<string[]>(['']);
    const selectYearsAry: string[] = [];
    for (let i = 0; i <= (getPresentYear - startYear); i++) {
        selectYearsAry.push(`${startYear + i}`);
    }
    useEffect(() => setSelectYears((_prevSelectYearsAry) => selectYearsAry), []);

    const selectQuarter: number[] = [1, 2, 3, 4]; // 1:1月～3月、2:4月～6月、3:7月～10月、4:11月～12月

    return (
        <form action="" className={`YearsQuarterLists ${SelectTermClassName}`}>
            {explainSentence && <p className="explainSentence">{explainSentence}</p>}
            <select name="" id="yearsLists">
                {isSelectYears.map((yearsEls, i) => (
                    <option key={i} value={yearsEls}>{yearsEls}</option>
                ))}
            </select>
            <select name="" id="quarterLists">
                {selectQuarter.map((quarterEl, i) => (
                    <option key={i} value={quarterEl}>{quarterEl}</option>
                ))}
            </select>
        </form>
    );
});