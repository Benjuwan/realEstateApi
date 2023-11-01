import { useState, useEffect, memo, useContext } from "react";
import { cityAry } from "../../ts/filterType/cityDataAryEls";
import { GetFetchPrefCode } from "../../providers/filter/GetFetchPrefCode";
import { useFetchPrefData } from "../../hooks/filter/useFetchPrefData";

export const SelectCities = memo(() => {
    /* fetch API：都道府県コード */
    const { FetchPrefData } = useFetchPrefData();

    /* 都道府県コード */
    const { isGetFetchPrefCode } = useContext(GetFetchPrefCode);

    /* 市区町村リスト（select） */
    const [isCities, setCities] = useState<Array<cityAry>>([]);

    useEffect(() => {
        const selectEl: HTMLSelectElement | null = document.querySelector('#citiesLists');
        if (selectEl) {
            selectEl.innerHTML = ""; //（都道府県コード [isGetFetchPrefCode] が変わる度に）市区町村リストをリセット（初期化）
        }

        FetchPrefData(isCities, setCities); // fetch API：都道府県コード
    }, [isGetFetchPrefCode]);

    return (
        <form action="">
            <select name="" id="citiesLists">
                {isCities.map((city, i) => (
                    <option key={i} label={city.name} value={city.id}>{city.name}</option>
                ))}
            </select>
        </form>
    );
});