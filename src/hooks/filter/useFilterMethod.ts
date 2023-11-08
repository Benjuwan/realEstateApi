import { useContext } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { GetFetchPrefCode } from "../../providers/filter/GetFetchPrefCode";

export const useFilterMethod = () => {
    const { isGetFetchData, setGetFetchData } = useContext(GetFetchDataContext);

    /* フィルター：Type（用途）*/
    const FilterType = (filterWord: string | null) => {
        const filterTypeAry: estateInfoJsonDataContents[] = [...isGetFetchData].filter(els => filterWord === els.Type);
        setGetFetchData((_prevFetchAry) => filterTypeAry);
    }

    /* フィルター：DistrictName（地区）*/
    const FilterPlace = (filterWord: string | null) => {
        const filterPlaceAry: estateInfoJsonDataContents[] = [...isGetFetchData].filter(els => els.DistrictName.match(`${filterWord}`));
        if (filterPlaceAry.length === 0) {
            alert(`地区名「${filterWord}」は、\n検索条件のデータ内に存在しません。`);
            return; // リターンで処理終了
        } else {
            setGetFetchData((_prevFetchAry) => filterPlaceAry);
        }
    }

    /* フィルター：特定の文字列 */
    const FilterSpecificWord = (
        targetElsAry: HTMLElement[] | NodeListOf<HTMLElement>,
        filterWord: string | null,
        setSpecificContents: (value: React.SetStateAction<HTMLElement[] | NodeListOf<HTMLElement>>) => void
    ) => {
        const filterTypeAry: HTMLElement[] | NodeListOf<HTMLElement> = [...targetElsAry].filter(els => els.textContent?.match(`${filterWord}`));
        setSpecificContents((_prevSpecificContents) => filterTypeAry);
    }

    /* データリセット */
    const { setGetFetchPrefCode } = useContext(GetFetchPrefCode);
    const ResetFilter = () => {
        setGetFetchData((_prevFetchAry) => []); // フィルターのかかったデータを一旦削除（配列を空に）

        /* 都道府県 select を初期値に戻す */
        const prefListsOptions: NodeListOf<HTMLOptionElement> | null = document.querySelectorAll('#prefLists option');
        prefListsOptions.forEach(optionEl => {
            optionEl.removeAttribute('selected');
            if (optionEl.value === '01') {
                optionEl.setAttribute('selected', 'true');
            }
        });
        setGetFetchPrefCode((_prevFetchPrefCode) => '01'); // 都道府県コードを初期値に戻す
    }

    return { FilterType, FilterPlace, FilterSpecificWord, ResetFilter }
}