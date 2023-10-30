import { useContext } from "react"
import { CityName } from "../../providers/filter/CityName"
import { useGetJsonDataXai } from "./useGetJsonDataXai";

export const useSetPrefCityName = () => {
    /* 市区町村名 State の更新関数 */
    const { setCityName } = useContext(CityName);

    /* fetch API */
    const { GetJsonDataXai } = useGetJsonDataXai();

    /* 選択した option 要素のラベル名（都道府県名・市区町村名）を取得 */
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
            }).filter(optionEl => {
                return optionEl !== undefined;
            });
            // console.log(getTargetOptionLabelAry); // 都道府県名は StrictMode では 2重表記
            return getTargetOptionLabelAry[0];
        }
    }

    /* 選択した option 要素のラベル名（都道府県名・市区町村名）を市区町村名 State にセット */
    const SetPrefCityName = (
        prefListsName: string,
        citiesListsName: string,
    ) => {
        /* 都道府県名 を取得 */
        const prefLists: HTMLSelectElement | null = document.querySelector(prefListsName);
        const getTargetOption_PrefName: string | undefined = _getTargetOptionLabel(prefLists);
        console.log(prefLists?.value); // 都道府県コード

        /* 市区町村名 を取得 */
        const citiesLists: HTMLSelectElement | null = document.querySelector(citiesListsName);
        const getTargetOption_CityName: string | undefined = _getTargetOptionLabel(citiesLists);
        console.log(citiesLists?.value); // 市区町村コード

        /* 都道府県名 - 市区町村名 の文字列を生成 */
        const prefCityName: string | null = `${getTargetOption_PrefName} ${getTargetOption_CityName}`;

        /* 都道府県名 - 市区町村名 の文字列をセット */
        setCityName((_prevCityname) => prefCityName);

        /* 都道府県名 - 市区町村名 に準拠したデータを取得及び反映 */
        GetJsonDataXai(citiesLists?.value);
    }

    return { SetPrefCityName }
}