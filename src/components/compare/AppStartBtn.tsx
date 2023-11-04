import { memo, FC, useContext } from "react";
import { CompareLoadingState } from "../../providers/compare/CompareLoadingState";
import { useGetTradePrice } from "../../hooks/compare/useGetTradePrice";

type AppStartBtnType = {
    termLists_from: number;
    termLists_to: number;
}

export const AppStartBtn: FC<AppStartBtnType> = memo((props) => {
    const { termLists_from, termLists_to } = props;

    /* 各種 Context */
    const { isCompareLoading } = useContext(CompareLoadingState);

    /* 取引価格の取得と表示 */
    const { GetTradePrice } = useGetTradePrice();

    /* 計測ボタンのアクション */
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
                if (prefCityName !== null) prefCityName.textContent = `${prefName} ${cityName}`;
            }
        }
    }

    return (
        <button type="button" className="appStartBtn" disabled={isCompareLoading} onClick={appStart}>計測スタート</button>
    );
});