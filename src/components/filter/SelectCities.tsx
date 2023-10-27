import { useState, useEffect, ChangeEvent, memo, useContext, FC } from "react";
import { GetFetchCityCode } from "../../providers/filter/GetFetchCityCode";
import { useGetJsonData } from "../../hooks/filter/useGetJsonData";

type optionDefaultNameType = {
    optionDefaultName?: string;
}

type cityAry = {
    id: string;
    name: string;
}

type ciryData = {
    data: Array<cityAry>;
}

export const SelectCities: FC<optionDefaultNameType> = memo((props) => {
    const { optionDefaultName = 'please choose below lists.' } = props;

    /* fetch API */
    const { GetJsonData } = useGetJsonData();

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

        const getCityData = async () => {
            const response = await fetch(`https://www.land.mlit.go.jp/webland/api/CitySearch?area=${isGetFetchCityCode}`);
            const resObj: ciryData = await response.json();
            const ciryAry: Array<cityAry> = resObj.data;
            const newAry = [...isCities];
            ciryAry.forEach(aryEl => {
                newAry.push(aryEl);
                setCities(newAry);
            });
        }
        getCityData();
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