import { memo, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { useFilterMethod } from "../../hooks/filter/useFilterMethod";
import { useSortMethod } from "../../hooks/filter/useSortMethod";

export const FilterActionBtns = memo(() => {
    const { ascClick, deskClick } = useSortMethod();
    const { FilterPlace, ResetFilter } = useFilterMethod();

    /* 場所フィルター機能の input テキスト関連の処理 */
    const [isInputValue, setInputValue] = useState<string>('');
    const changeInputValue = (inputEl: ChangeEvent<HTMLInputElement>) => {
        const inputElValue: string = inputEl.currentTarget.value;
        setInputValue((_prevInputEl) => inputElValue);
    }

    /* フィルターのリセット・初期化 */
    const filterReset = () => {
        setInputValue((_prevInputValue) => '');
        ResetFilter();
    }

    return (
        <Btns className="btns">
            <button type="button" className="askBtn" onClick={ascClick}>昇順</button>
            <button type="button" className="deskBtn" onClick={deskClick}>降順</button>
            <div className="filterPlace">
                <input type="text" value={isInputValue} onInput={(inputEl: ChangeEvent<HTMLInputElement>) => {
                    changeInputValue(inputEl);
                }} />
                <button type="button" className="placeBtn" disabled={isInputValue.length <= 0} onClick={() => { FilterPlace(isInputValue); }}>入力した地区で検索</button>
            </div>
            <button type="button" className="resetBtn" onClick={filterReset}>リセット</button>
        </Btns>
    );
});

const Btns = styled.div`
margin-bottom: 2em;
display: flex;
align-items: flex-start;
flex-flow: row wrap;
background-color: #dadada;
padding: 1em 3em;
border-radius: 4px;
gap: 2%;

& button {
    width: 20%;

    &[disabled]{
        cursor: default;
        background-color: #dadada;
        color: #eaeaea;
    }

    &.resetBtn {
        width: 100%;
        margin-top: 1em;
    }
}

& .filterPlace{
    width: 56%;
    display: flex;
    gap: 2%;

    & input,
    & button {
        width: 100%;
    }

    & input {
        font-size: 16px;
    }
}
`;