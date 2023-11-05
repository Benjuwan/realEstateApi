import { memo, FC } from "react";
import { useGetTradePrice } from "../../hooks/compare/useGetTradePrice";

type AppStartBtnType = {
    isAppStartBtn: boolean;
    termLists_from: number;
    termLists_to: number;
    isViewChart: boolean;
    setViewChart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppStartBtn: FC<AppStartBtnType> = memo((props) => {
    const { isAppStartBtn, termLists_from, termLists_to, isViewChart, setViewChart } = props;

    /* 取引価格の取得と表示 */
    const { GetTradePrice } = useGetTradePrice();

    /*（都道府県名・市区町村名を取得するための）計測ボタンのアクション */
    const _getPrefCityName = (
        prefSelectOption: NodeListOf<HTMLOptionElement>,
        prefSelectEl: HTMLSelectElement | null
    ) => {
        const nameBoxes: string[] = [];
        prefSelectOption.forEach(optionEl => {
            if (optionEl.value === prefSelectEl?.value) {
                nameBoxes.push(optionEl.label);
            }
        });
        return nameBoxes[0];
    }

    const appStart = () => {
        if (isViewChart === true) setViewChart(false); // chart の初期化

        if (termLists_from !== termLists_to && termLists_from < termLists_to) {
            /* 既にリストが存在する場合はリセットする */
            const AverageCalcLists: HTMLUListElement | null = document.querySelector('.AverageCalcLists');
            if (AverageCalcLists !== null && AverageCalcLists.childNodes.length > 0) AverageCalcLists.innerHTML = "";

            /* 計測終了期間から計測開始期間を差し引いて計測期間リストを生成 */
            const termLists: number[] = [];
            const targetValue: number = termLists_to - termLists_from;
            for (let i = 0; i <= targetValue; i++) {
                const termValue: number = termLists_from + i;
                termLists.push(termValue);
            }

            /* 市区町村コードを取得 */
            const citySelectEl: HTMLSelectElement | null = document.querySelector('#citiesLists');
            const citySelectElValue = citySelectEl?.value;

            /* 計測期間リストの各年に対して取引価格の取得及び平均取引価格の算出と反映を行う */
            termLists.forEach(annualYear => {
                GetTradePrice(citySelectElValue, annualYear);
            });

            /* 都道府県名・市区町村名の表示 */
            const prefCityName = document.querySelector('#prefCityName');
            const prefSelectEl: HTMLSelectElement | null = document.querySelector('#prefLists');
            const prefSelectOption: NodeListOf<HTMLOptionElement> | undefined = prefSelectEl?.querySelectorAll('option');
            const citySelectOption: NodeListOf<HTMLOptionElement> | undefined = citySelectEl?.querySelectorAll('option');
            if (
                typeof prefSelectOption !== "undefined" &&
                typeof citySelectOption !== "undefined"
            ) {
                const prefName = _getPrefCityName(prefSelectOption, prefSelectEl);
                const cityName = _getPrefCityName(citySelectOption, citySelectEl);
                if (prefCityName !== null) prefCityName.textContent = `現在表示されているのは「${prefName} ${cityName}」の情報です。`;
            }
        }
    }

    return (
        <button type="button" className="appStartBtn" disabled={isAppStartBtn} onClick={appStart}>計測スタート</button>
    );
});