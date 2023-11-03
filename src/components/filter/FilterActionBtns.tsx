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
flex-flow: row wrap;
background-color: #f1f1f1;
padding: 1em 3em;
border-radius: 4px;
gap: 2%;

& button {
    width: 20%;
    color: #fff;

    &[disabled]{
        cursor: default;
        background-color: #dadada!important;
        color: #eaeaea!important;
    }

    &.askBtn,
    &.deskBtn {
        background-color: #182ebb;

        &:hover{
            color: #182ebb;
            border-color: #182ebb;
            background-color: #fff;
        }
    }

    &.placeBtn{
        font-size: clamp(10px, calc(100vw/56), 16px);
        background-color: #4f2609;

        &:not([disabled]):hover{
            color: #4f2609;
            border-color: #4f2609;
            background-color: #fff;
        }
    }

    &.resetBtn {
        width: 100%;
        margin-top: 1em;
        background-color: #bb1818;

        &:hover{
            color: #bb1818;
            border-color: #bb1818;
            background-color: #fff;
        }
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