import { useState, useEffect, ChangeEvent, memo, useContext, FC } from "react";
import { cityAry } from "../../ts/filterType/cityDataAryEls";
import { GetFetchCityCode } from "../../providers/filter/GetFetchCityCode";
import { useGetJsonData } from "../../hooks/filter/useGetJsonData";
import { useFetchCityData } from "../../hooks/filter/useFetchCityData";

type optionDefaultNameType = {
    optionDefaultName?: string;
}

export const SelectCities: FC<optionDefaultNameType> = memo((props) => {
    const { optionDefaultName = 'please choose below lists.' } = props;

    /* fetch API */
    const { GetJsonData } = useGetJsonData();

    /* fetch API：市区町村コード */
    const { FetchCityData } = useFetchCityData();

    /* 市区町村コード */
    const { isGetFetchCityCode } = useContext(GetFetchCityCode);

    /* 市区町村リスト（select） */
    const [isCities, setCities] = useState<Array<cityAry>>([]);

    useEffect(() => {
        const selectEl: HTMLSelectElement | null = document.querySelector('#citiesLists');
        if (selectEl) {
            selectEl.innerHTML = ""; //（市区町村コード [isGetFetchCityCode] が変わる度に）市区町村リストをリセット（初期化）
        }
        selectEl?.insertAdjacentHTML('afterbegin', `<option>${optionDefaultName}</option>`); // 市区町村リストに市区町村コードに準拠した地名を追加

        FetchCityData(isCities, setCities);
    }, [isGetFetchCityCode]);

    const getCityCode = (el: HTMLFormElement) => {
        /* form 要素を親に持っていないと下記の記述は不可能 */
        const selectElValue: string | undefined = el.querySelector('select')?.value;
        console.log(selectElValue);
        // GetJsonData(`${selectElValue}`);
    }

    return (
        <form action="" onChange={(el: ChangeEvent<HTMLFormElement>) => {
            el.preventDefault();
            getCityCode(el.currentTarget);
        }}>
            <select name="" id="citiesLists">
                {isCities.map((city, i) => (
                    <option key={i} label={city.name} value={city.id}>{city.name}</option>
                ))}
            </select>
        </form>
    );
});