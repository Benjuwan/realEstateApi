import { useContext } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { FetchDataResetRenderContext } from "../../providers/filter/FetchDataResetRender";

export const useFilterMethod = () => {
    const { isGetFetchData, setGetFetchData } = useContext(GetFetchDataContext);
    const { isFetchDataResetRender, setFetchDataResetRender } = useContext(FetchDataResetRenderContext);

    const FilterType = (filterWord: string | null) => {
        const filterTypeAry: Array<estateInfoJsonDataContents> = [...isGetFetchData].filter(els => filterWord === els.Type);
        setGetFetchData((_prevFetchAry) => [...isGetFetchData, ...filterTypeAry]);
    }

    const FilterPlace = (filterWord: string | null) => {
        const filterPlaceAry: Array<estateInfoJsonDataContents> = [...isGetFetchData].filter(els => filterWord === els.Municipality);
        setGetFetchData((_prevFetchAry) => [...isGetFetchData, ...filterPlaceAry]);
    }

    const ResetFilter = () => {
        /* フィルターのかかったデータを一旦削除（配列を空に）して、データフェッチのリセット用のState を更新することで CompareComponent.tsx（ベースコンポーネント）にて再度データフェッチを行う */
        setGetFetchData((_prevFetchAry) => [...isGetFetchData, ...[]]);
        setFetchDataResetRender((_prevBool) => !isFetchDataResetRender);
    }

    return { FilterType, FilterPlace, ResetFilter }
}