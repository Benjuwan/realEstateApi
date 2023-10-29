import { useContext } from "react";
import { ciryData, cityAry } from "../../ts/filterType/cityDataAryEls";
import { GetFetchCityCode } from "../../providers/filter/GetFetchCityCode";

export const useFetchCityData = () => {
    /* 市区町村コード */
    const { isGetFetchCityCode } = useContext(GetFetchCityCode);

    const FetchCityData = (
        isCities: cityAry[],
        setCities: React.Dispatch<React.SetStateAction<cityAry[]>>
    ) => {
        const fetchCityDataMethod = async () => {
            const response = await fetch(`https://www.land.mlit.go.jp/webland/api/CitySearch?area=${isGetFetchCityCode}`);
            const resObj: ciryData = await response.json();
            const ciryAry: Array<cityAry> = resObj.data;
            const newAry = [...isCities];
            ciryAry.forEach(aryEl => {
                newAry.push(aryEl);
                setCities((_prevAry) => newAry);
            });
        }
        fetchCityDataMethod();
    }

    return { FetchCityData }
}