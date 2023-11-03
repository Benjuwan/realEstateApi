import { useContext } from "react";
import { cityAry, cityData } from "../../ts/filterType/cityDataAryEls";
import { CompareGetFetchPrefCode } from "../../providers/compare/CompareGetFetchPrefCode";

export const useCompareFetchPrefData = () => {
    const { isGetFetchPrefCode } = useContext(CompareGetFetchPrefCode); // 都道府県コード

    const CompareFetchPrefData = (
        isCities: cityAry[],
        setCities: React.Dispatch<React.SetStateAction<cityAry[]>>
    ) => {
        const CompareFetchPrefDataMethod = async () => {
            const response = await fetch(`https://www.land.mlit.go.jp/webland/api/CitySearch?area=${isGetFetchPrefCode}`);
            const resObj: cityData = await response.json();
            const PrefAry: cityAry[] = resObj.data;
            const resObjAry = PrefAry.map(aryEl => {
                return aryEl;
            });
            setCities((_prevAry) => [...isCities, ...resObjAry]);
        }
        CompareFetchPrefDataMethod();
    }

    return { CompareFetchPrefData }
}