import { useContext } from "react";
import { cityAry, cityData } from "../../ts/filterType/cityDataAryEls";
import { GetFetchPrefCode } from "../../providers/filter/GetFetchPrefCode";

export const useFetchPrefData = () => {
    const { isGetFetchPrefCode } = useContext(GetFetchPrefCode); // 都道府県コード

    const FetchPrefData = (
        isCities: cityAry[],
        setCities: React.Dispatch<React.SetStateAction<cityAry[]>>
    ) => {
        const fetchPrefDataMethod = async () => {
            const response = await fetch(`https://www.land.mlit.go.jp/webland/api/CitySearch?area=${isGetFetchPrefCode}`);
            const resObj: cityData = await response.json();
            const PrefAry: cityAry[] = resObj.data;
            const resObjAry = PrefAry.map(aryEl => {
                return aryEl;
            });
            setCities((_prevAry) => [...isCities, ...resObjAry]);
        }
        fetchPrefDataMethod();
    }

    return { FetchPrefData }
}