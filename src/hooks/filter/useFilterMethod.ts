import { useContext } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
// import { FetchDataResetRenderContext } from "../../providers/filter/FetchDataResetRender";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
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
        if (filterPlaceAry.length === 0) return // 早期リターンで処理終了
        else setGetFetchData((_prevFetchAry) => filterPlaceAry);
    }

    /* フィルター：特定の文字列 */
    const FilterSpecificWord = (
        targetElsAry: HTMLElement[] | NodeListOf<HTMLElement>,
        filterWord: string | null,
        setSpecificContents: (value: React.SetStateAction<HTMLElement[] | NodeListOf<HTMLElement>>) => void
    ) => {
        const filterTypeAry: HTMLElement[] | NodeListOf<HTMLElement> = [...targetElsAry].filter(els => filterWord === els.textContent);
        setSpecificContents((_prevSpecificContents) => filterTypeAry);
    }

    /* データリセット */
    const { setGetFetchPrefCode } = useContext(GetFetchPrefCode);
    // const { isFetchDataResetRender, setFetchDataResetRender } = useContext(FetchDataResetRenderContext); // FetchDataContents.tsx にてコンテンツデータを初期取得及び表示している場合に使用
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

        /* 以下は FetchDataContents.tsx にてコンテンツデータを初期取得及び表示している場合に使用 */
        // setFetchDataResetRender((_prevBool) => !isFetchDataResetRender); // データフェッチのリセット用のState を更新することで再度データフェッチ（再レンダリング）
    }

    return { FilterType, FilterPlace, FilterSpecificWord, ResetFilter }
}