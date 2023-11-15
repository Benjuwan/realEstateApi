import { FC, memo, useContext, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

/**
 * pager 単体で使用したい場合は下記の Context / Fragment を利用する。
 * 単体使用時は、コンテンツデータ用の配列など各種 State を下記 Context で用意したものに差し替える必要がある
*/
// import { PagerGetFetchDataContext } from "../../providers/pager/PagerGetFetchData";

type InputPagerNumType = {
    pagerLimitMaxNum: number;
}

export const InputPagerNum: FC<InputPagerNumType> = memo(({ pagerLimitMaxNum }) => {
    /* 各種Context */
    // const { setPagers } = useContext(PagerGetFetchDataContext);
    const { setPagers, isOffSet, setCurrPager } = useContext(GetFetchDataContext);

    /* input[type="text"]の State */
    const [isInputValue, setInputValue] = useState<string>('');
    /* inputTxt：input[type="text"]の onInput イベントで行う処理 */
    const inputTxt = (inputEv: ChangeEvent<HTMLInputElement>) => {
        const inputElValue = inputEv.currentTarget.value;
        if (Number(inputElValue)) {
            /* 数値のみ入力を受け付ける */
            setInputValue((_prevInoutTxt) => inputElValue);
        } else {
            /* 数値以外は拒否（空欄にする）することでデリート操作で先頭 1文字が残る現象を解消 */
            setInputValue((_prevInoutTxt) => '');
        }
    }

    /* 数値入力によるページャー機能 */
    const setPagerNumber = (
        inputValue: string
    ) => {
        /* ページャーにセットする予定の各種ページャー項目の値とページ番号を取得 */
        const dataPagerEls: NodeListOf<HTMLElement> = document.querySelectorAll('[data-pager]');
        const dataPagerValue: (string | null)[][] = Array.from(dataPagerEls).map(dataPagerEl => [
            dataPagerEl.getAttribute('data-pager'),
            dataPagerEl.textContent
        ]); // (string | null)[][] === Array<Array<string | null>>

        /* 取得したページャー項目の数だけループさせ、各ページャー項目の値と入力数値を計算してオフセット数以下になる値を該当数値（入力数値が含まれるページ数）として各種 State 変数にセット（更新）する */
        for (let i = 0; i < dataPagerValue.length; i++) {
            if (dataPagerValue[i - 1] !== undefined) {
                const currentPagerVal: number = Number(dataPagerValue[i][0]);
                if (currentPagerVal - parseInt(inputValue) < isOffSet) {
                    const finalPagerVal: number = Number(dataPagerValue[dataPagerValue.length - 1][0]);
                    if (parseInt(inputValue) >= finalPagerVal) {
                        /* 入力数値が最終ページャー項目の値よりも「大きい」場合は最終ページャー項目の値をセット */
                        setPagers((_prevPagerNum) => finalPagerVal);

                        /* 表示中のページ番号を変更 */
                        const finalPagerNum = dataPagerValue[dataPagerValue.length - 1][1];
                        setCurrPager((_prevCurrPager) => Number(finalPagerNum));
                    } else {
                        /* 該当数値（入力数値が含まれるページ数）をセット */
                        const behindPagerVal: number = Number(dataPagerValue[i - 1][0]);
                        setPagers((_prevPagerNum) => behindPagerVal);

                        /* 表示中のページ番号を変更 */
                        const behindPagerNum = dataPagerValue[i - 1][1];
                        setCurrPager((_prevCurrPager) => Number(behindPagerNum));
                    }
                    // console.log(currentPagerVal, isInputValue, behindPagerVal, finalPagerVal);

                }
            }
        }
    }

    return (
        <SetPagerNumEl>
            <label htmlFor="">コンテンツナンバーを入力<input type="text" value={isInputValue} onInput={(inputEv: ChangeEvent<HTMLInputElement>) => {
                if (parseInt(inputEv.currentTarget.value) > pagerLimitMaxNum) {
                    /* 上限値を超えた場合はアラート表示して input 入力欄を空欄にする */
                    alert(`「${pagerLimitMaxNum}」以内の数値で入力してください`)
                    setInputValue((_prevInoutTxt) => '');
                } else {
                    inputTxt(inputEv);
                }
            }} /></label>
            <button type="button" disabled={isInputValue.length <= 0} onClick={() => {
                setPagerNumber(isInputValue);
                setInputValue((_prevInputValue) => '');
            }}>移動</button>
        </SetPagerNumEl>
    );
});

const SetPagerNumEl = styled.div`
width: 100%;
margin: 0 auto 1em;
display: flex;
justify-content: space-between;
gap: 4%;

& button {
    cursor: pointer;
    width: 100%;
    display: block;
    padding: .25em 1em;
    background-color: #333;
    color: #fff;
    border-radius: 4px;
    border: 1px solid transparent;

    &[disabled]{
        cursor: default;
        background-color: #eaeaea;
        color: #dadada;
    }

    &:not([disabled]):hover {
        background-color: #fff;
        border-color: #333;
        color: #333;
    }
}

& label {
    width: 100%;

    & input {
        width: 100%;
        font-size: 16px;
    }
}
`;