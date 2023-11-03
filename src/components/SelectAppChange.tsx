import { memo, FC, ChangeEvent, useContext, useEffect } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../providers/filter/GetFetchData";
import { GetFetchPrefCode } from "../providers/filter/GetFetchPrefCode";

type SelectAppType = {
    isAppChange: string;
    setAppChange: React.Dispatch<React.SetStateAction<string>>;
    isFirstSelect?: boolean;
    setFirstSelect?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SelectAppChange: FC<SelectAppType> = memo((props) => {
    const { isAppChange, setAppChange, isFirstSelect, setFirstSelect } = props;

    /* 各種 Context */
    const { setGetFetchData } = useContext(GetFetchDataContext);
    const { setGetFetchPrefCode } = useContext(GetFetchPrefCode);

    /* App 機能切替と切替時の初期化に関する処理 */
    const selectAppComponent = (AppChangeEl: ChangeEvent<HTMLSelectElement>) => {
        /* App 機能切替 */
        const AppChangeValue: string = AppChangeEl.currentTarget.value;
        setAppChange((_prevAppChangeValue) => AppChangeValue);

        /* 初期化処理（一部は SelectPrefs.tsx のデータ取得ボタンのクリックイベントにも記述）*/
        setGetFetchData((_prevGetFetchData) => []); // コンテンツデータをリセット
        setGetFetchPrefCode((_prevGetFetchPrefCode) => '01'); // 市区町村 select を初期化
        if (typeof setFirstSelect !== "undefined") setFirstSelect(true); // 初期表示を検知
    }

    /*（コンテンツデータ表示後の仕様・機能切替を行えるようにするために）選択した機能名（isAppChange）に合致した値を持つ option 要素に selected 属性を付与 */
    useEffect(() => {
        const AppChangeOptions: NodeListOf<HTMLOptionElement> | null = document.querySelectorAll('#AppChange option');
        AppChangeOptions.forEach(optionElm => {
            if (optionElm.value === isAppChange) {
                optionElm.setAttribute('selected', 'true');
            }
        });
    }, [isAppChange]); // isAppChange：依存配列 機能を切り替える度に行う

    return (
        <AppChange name="" className={isAppChange === 'mount' ? 'mount' : 'active'} id="AppChange" onChange={(AppChangeEl: ChangeEvent<HTMLSelectElement>) => {
            selectAppComponent(AppChangeEl);
        }}>
            {isFirstSelect || <option>ここから機能を選んでください</option>}
            <option value="pager">pager（ページャー）</option>
            <option value="filter">filter（フィルター）</option>
        </AppChange>
    );
});

const AppChange = styled.select`
display: block;
font-size: 16px;
line-height: 2;

&.mount{
    margin: 3em auto;
}

&.active{
    margin-bottom: 1em;
}
`;