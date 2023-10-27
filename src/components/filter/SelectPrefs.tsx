import { ChangeEvent, useEffect, useRef, memo, useContext } from "react";
import { SelectCities } from "./SelectCities";
import { GetFetchCityCode } from "../../providers/filter/GetFetchCityCode";

export const SelectPrefs = memo(() => {
    const { setGetFetchCityCode } = useContext(GetFetchCityCode);

    const refFormSelectElValue = useRef<HTMLFormElement | null>(null);
    const get_SelectElValue_CityCode = () => {
        /* form 要素を親に持っていないと下記の記述（ParentEl.querySelector('select')?.value）は不可能 */
        const formSelectElValue: string | undefined = refFormSelectElValue.current?.querySelector('select')?.value;
        if (formSelectElValue) {
            setGetFetchCityCode((_prevCode) => formSelectElValue);
        }
    }

    const PrefName: string = '北海道,青森県,岩手県,宮城県,秋田県,山形県,福島県,茨城県,栃木県,群馬県,埼玉県,千葉県,東京都,神奈川県,新潟県,富山県,石川県,福井県,山梨県,長野県,岐阜県,静岡県,愛知県,三重県,滋賀県,京都府,大阪府,兵庫県,奈良県,和歌山県,鳥取県,島根県,岡山県,広島県,山口県,徳島県,香川県,愛媛県,高知県,福岡県,佐賀県,長崎県,熊本県,大分県,宮崎県,鹿児島県,沖縄県';
    const PrefNameAry: Array<string> = PrefName.split(',');

    /* Strict mode では2回レンダリングされるので option が重複する */
    useEffect(() => {
        const selectEl = document.querySelector('select');
        for (let i = 1; i <= 47; i++) {
            if (i < 10) {
                selectEl?.insertAdjacentHTML('beforeend', `<option value=0${i}>${PrefNameAry[i - 1]}</option>`);
            } else {
                selectEl?.insertAdjacentHTML('beforeend', `<option value=${i}>${PrefNameAry[i - 1]}</option>`);
            }
        }
    }, []);

    return (
        <>
            <form action="" ref={refFormSelectElValue} onChange={(el: ChangeEvent<HTMLFormElement>) => {
                el.preventDefault();
                get_SelectElValue_CityCode();
            }}>
                <select name="" id=""></select>
            </form>
            <SelectCities optionDefaultName="選択してください" />
        </>
    );
});