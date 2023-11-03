import { memo, useContext, useEffect, useState } from "react";
import { cityAry } from "../../ts/filterType/cityDataAryEls";
import { CompareGetFetchPrefCode } from "../../providers/compare/CompareGetFetchPrefCode";
import { useCompareFetchPrefData } from "../../hooks/compare/useCompareFetchPrefData";

export const CompareSelectCity = memo(() => {
    const { CompareFetchPrefData } = useCompareFetchPrefData(); // CompareSelectCity 固有カスタムフック
    const { isGetFetchPrefCode } = useContext(CompareGetFetchPrefCode);
    const [isCities, setCities] = useState<Array<cityAry>>([]);
    useEffect(() => {
        const selectEl: HTMLSelectElement | null = document.querySelector('#citiesLists');
        if (selectEl) selectEl.innerHTML = "";
        CompareFetchPrefData(isCities, setCities);
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