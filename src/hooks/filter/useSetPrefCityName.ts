import { useContext } from "react"
import { CityName } from "../../providers/filter/CityName"

export const useSetPrefCityName = () => {
    /* 市区町村名 State の更新関数 */
    const { setCityName } = useContext(CityName);

    /* 選択した option 要素の市区町村名を取得 */
    const _getTargetOptionLabel = (
        selectEl: HTMLSelectElement | null
    ) => {
        const optionEls: NodeListOf<HTMLOptionElement> | undefined = selectEl?.querySelectorAll('option');
        if (typeof optionEls !== 'undefined') {
            /* 型ガードを通して処理を実行 */
            const getTargetOptionLabelAry: (string | undefined)[] = Array.from(optionEls).map(optionEl => {
                if (selectEl?.value === optionEl.value) {
                    const getTargetOptionLabel: string | null = optionEl.label;
                    return getTargetOptionLabel;
                }
            });

            return getTargetOptionLabelAry.join('');
        }
    }

    /* 選択した option 要素の市区町村名を市区町村名 State にセット */
    const SetPrefCityName = (
        selectEl: HTMLSelectElement | null
    ) => {
        const getTargetOptionLabelName: string | undefined = _getTargetOptionLabel(selectEl);
        console.log(getTargetOptionLabelName);
        if (typeof getTargetOptionLabelName !== "undefined") {
            /* 型ガードを通して処理を実行 */
            setCityName((_prevCityname) => getTargetOptionLabelName);
        }
    }

    return { SetPrefCityName }
}