import { useState, useEffect, ChangeEvent, memo, useContext, FC } from "react";
import { cityAry } from "../../ts/filterType/cityDataAryEls";
import { GetFetchPrefCode } from "../../providers/filter/GetFetchPrefCode";
import { useFetchPrefData } from "../../hooks/filter/useFetchPrefData";
import { useSetPrefCityName } from "../../hooks/filter/useSetPrefCityName";

type optionDefaultNameType = {
    optionDefaultName?: string;
}

export const SelectCities: FC<optionDefaultNameType> = memo((props) => {
    const { optionDefaultName = 'please choose below lists.' } = props;

    /* fetch API：都道府県コード */
    const { FetchPrefData } = useFetchPrefData();

    /* 都道府県コード */
    const { isGetFetchPrefCode } = useContext(GetFetchPrefCode);

    /* 市区町村リスト（select） */
    const [isCities, setCities] = useState<Array<cityAry>>([]);

    /*  */
    const { SetPrefCityName } = useSetPrefCityName();

    useEffect(() => {
        const selectEl: HTMLSelectElement | null = document.querySelector('#citiesLists');
        if (selectEl) {
            selectEl.innerHTML = ""; //（都道府県コード [isGetFetchPrefCode] が変わる度に）市区町村リストをリセット（初期化）
        }
        selectEl?.insertAdjacentHTML('afterbegin', `<option>${optionDefaultName}</option>`); // 都道府県リストに都道府県コードに準拠した地名を追加

        FetchPrefData(isCities, setCities); // fetch API：都道府県コード
    }, [isGetFetchPrefCode]);

    return (
        <form action="" onChange={(el: ChangeEvent<HTMLFormElement>) => {
            el.preventDefault();
            SetPrefCityName('#prefLists', '#citiesLists');
        }}>
            <select name="" id="citiesLists">
                {isCities.map((city, i) => (
                    <option key={i} label={city.name} value={city.id}>{city.name}</option>
                ))}
            </select>
        </form>
    );
});