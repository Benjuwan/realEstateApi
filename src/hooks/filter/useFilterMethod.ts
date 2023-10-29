import { useContext } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { FetchDataResetRenderContext } from "../../providers/filter/FetchDataResetRender";

export const useFilterMethod = () => {
    const { isGetFetchData, setGetFetchData } = useContext(GetFetchDataContext);
    const { isFetchDataResetRender, setFetchDataResetRender } = useContext(FetchDataResetRenderContext);

    const FilterType = (filterWord: string | null) => {
        const filterTypeAry: Array<estateInfoJsonDataContents> = [...isGetFetchData].filter(els => filterWord === els.Type);
        setGetFetchData((_prevFetchAry) => filterTypeAry);
    }

    const FilterPlace = (filterWord: string | null) => {
        const filterPlaceAry: Array<estateInfoJsonDataContents> = [...isGetFetchData].filter(els => filterWord === els.Municipality);
        setGetFetchData((_prevFetchAry) => filterPlaceAry);
    }

    const ResetFilter = () => {
        /* フィルターのかかったデータを一旦削除（配列を空に）して、データフェッチのリセット用のState を更新することで FilterComponent.tsx（ベースコンポーネント）にて再度データフェッチを行う */
        setGetFetchData((_prevFetchAry) => []);
        setFetchDataResetRender((_prevBool) => !isFetchDataResetRender);
    }

    return { FilterType, FilterPlace, ResetFilter }
}