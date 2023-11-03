import { memo, FC, ChangeEvent, useContext } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../providers/filter/GetFetchData";
import { GetFetchPrefCode } from "../providers/filter/GetFetchPrefCode";

type SelectAppType = {
    setAppChange: React.Dispatch<React.SetStateAction<string>>;
    isFirstSelect?: boolean;
    setFirstSelect?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SelectAppChange: FC<SelectAppType> = memo((props) => {
    const { setAppChange, isFirstSelect, setFirstSelect } = props;

    /* 各種 Context */
    const { setGetFetchData, setPagers } = useContext(GetFetchDataContext);
    const { setGetFetchPrefCode } = useContext(GetFetchPrefCode);

    /* App 機能切替に関する処理 */
    const selectAppComponent = (AppChangeEl: ChangeEvent<HTMLSelectElement>) => {
        const AppChangeValue: string = AppChangeEl.currentTarget.value;
        setAppChange((_prevAppChangeValue) => AppChangeValue); // 機能の切替
        setGetFetchData((_prevGetFetchData) => []); // コンテンツデータをリセット
        setPagers((_prevPager) => 0); // ページャー数をリセット
        setGetFetchPrefCode((_prevGetFetchPrefCode) => '01'); // 市区町村 select を初期化
        if (typeof setFirstSelect !== "undefined") setFirstSelect(true); // 初期表示を検知
    }

    return (
        <AppChange name="" id="AppChange" onChange={(AppChangeEl: ChangeEvent<HTMLSelectElement>) => {
            selectAppComponent(AppChangeEl);
        }}>
            {isFirstSelect || <option>ここから機能を選んでください</option>}
            <option value="pager">ページャー機能</option>
            <option value="filter">フィルター機能</option>
        </AppChange>
    );
});

const AppChange = styled.select`
display: block;
margin: 3em auto;
font-size: 16px;
line-height: 2;
`;