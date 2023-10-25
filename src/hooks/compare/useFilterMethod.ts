import { useContext } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/compare/GetFetchData";
import { FetchDataResetRenderContext } from "../../providers/compare/FetchDataResetRender";

export const useFilterMethod = () => {
    const { isGetFetchData, setGetFetchData } = useContext(GetFetchDataContext);
    const { isFetchDataResetRender, setFetchDataResetRender } = useContext(FetchDataResetRenderContext);

    const FilterType = (filterWord: string | null) => {
        const filterTypeAry: Array<estateInfoJsonDataContents> = [...isGetFetchData].filter(els => filterWord === els.Type);
        setGetFetchData(filterTypeAry);
    }

    const FilterPlace = (filterWord: string | null) => {
        const filterPlaceAry: Array<estateInfoJsonDataContents> = [...isGetFetchData].filter(els => filterWord === els.Municipality);
        setGetFetchData(filterPlaceAry);
    }

    const ResetFilter = () => {
        /* フィルターのかかったデータを一旦削除（配列を空に）して、データフェッチのリセット用のState を更新することで CompareComponent.tsx（ベースコンポーネント）にて再度データフェッチを行う */
        setGetFetchData([]);
        setFetchDataResetRender(!isFetchDataResetRender);
    }

    return { FilterType, FilterPlace, ResetFilter }
}