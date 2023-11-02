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
    // const { setPagers, isOffSet } = useContext(PagerGetFetchDataContext);
    const { setPagers, isOffSet } = useContext(GetFetchDataContext);

    /* オフセットの1桁目を取得 */
    const targetOffsetFirstDigitAry: string[] = String(isOffSet).split('');
    const targetOffsetFirstDigit: number = parseInt(targetOffsetFirstDigitAry[targetOffsetFirstDigitAry.length - 1]);

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

    /* 四捨五入メソッド */
    const RoundingOff = (
        inputValue: string,
        targetNumOver?: boolean
    ) => {
        let adjustResult: number = parseInt(inputValue);
        const adjustResultSplitAry: string[] = String(adjustResult).split('');
        const shallowCopy = [...adjustResultSplitAry];

        if (targetNumOver) {
            /* 入力値の1桁目が 5 以上 の場合 */
            if (targetOffsetFirstDigit === 5) {
                /* オフセットの1桁目が「5」の場合 */
                const firstDigitDestroyAry: string[] = shallowCopy.splice(adjustResultSplitAry.length - 1, 1, '5');
                // console.log(shallowCopy.join(''), firstDigitDestroyAry.join(''));
                adjustResult = parseInt(shallowCopy.join(''));
            } else if (shallowCopy[1] === '9') {
                /*（現在 90 番台で次は）桁が増える場合は1桁目に加算して、2桁目以降は全て 0 にする */
                for (let i = 0; i < shallowCopy.length; i++) {
                    if (i >= 1) {
                        /* splice は破壊的な配列処理 */
                        shallowCopy.splice(i, 1, '0');
                    }
                }
                shallowCopy.splice(0, 1, `${parseInt(inputValue[0]) + 1}`);
                adjustResult = parseInt(shallowCopy.join(''));
            } else {
                /* 90 番台以外の場合 */
                const secondDigitDestroyAry: string[] = shallowCopy.splice(adjustResultSplitAry.length - 2, 1, `${parseInt(inputValue[adjustResultSplitAry.length - 2]) + 1}`);
                const firstDigitDestroyAry: string[] = shallowCopy.splice(adjustResultSplitAry.length - 1, 1, '0');
                // console.log(shallowCopy.join(''), secondDigitDestroyAry.join(''), firstDigitDestroyAry.join(''));
                adjustResult = parseInt(shallowCopy.join(''));
            }
        }

        else {
            /* 入力値の1桁目が 5 以下 の場合 */
            const secondDigitDestroyAry: string[] = shallowCopy.splice(adjustResultSplitAry.length - 1, 1, '0');
            // console.log(shallowCopy.join(''), secondDigitDestroyAry.join(''));
            adjustResult = parseInt(shallowCopy.join(''));
        }

        if (adjustResult <= isOffSet) {
            /* 調整結果がオフセット以下の場合 */
            setPagers((_prevPagerNum) => isOffSet);
            setInputValue((_prevInputValue) => String(adjustResult));
        } else {
            /* 調整結果がオフセット以上の場合 */
            setPagers((_prevPagerNum) => adjustResult);
            setInputValue((_prevInputValue) => String(adjustResult));
        }
    }

    /* 数値入力によるページャー機能 */
    const setPagerNumber = (
        inputValue: string
    ) => {
        let _inputValue: number = parseInt(inputValue);

        if (_inputValue % isOffSet === 0) {
            /* 入力値がオフセットの数値で割り切れる場合 */
            if (targetOffsetFirstDigit === 5) {
                /* オフセットの1桁目が「5」の場合 */
                const adjustNum: number = _inputValue - 1;
                setPagers((_prevPagerNum) => adjustNum);
                setInputValue((_prevInputValue) => String(adjustNum)); // 1つ減算した数値を渡す
            } else {
                /* else ではそのまま処理を進める */
                setPagers((_prevPagerNum) => _inputValue);
                setInputValue((_prevInputValue) => String(_inputValue));
            }
        } else {
            /* 入力値がオフセットの数値で割り切れない場合 */
            if (_inputValue >= isOffSet) {
                /* 入力値がオフセット以上 の場合 */
                if (targetOffsetFirstDigit === 5) {
                    /* オフセットの1桁目が「5」の場合 */
                    if (parseInt(inputValue[inputValue.length - 1]) >= 5) {
                        /* 入力値の1桁目が 5 以上 の場合 */
                        RoundingOff(inputValue, true);
                    } else {
                        /* 入力値の1桁目が 5 以下 の場合 */
                        RoundingOff(inputValue);
                    }
                }

                else {
                    /* オフセットの1桁目が「5」以下 の場合 */
                    RoundingOff(inputValue);
                }
            }

            else {
                /* 入力値がオフセット以下 の場合はページャー数を 0 にして進める（ページャー数の表記は ContentsNumber.tsx にて制御）*/
                setPagers((_prevPagerNum) => 0);
                setInputValue((_prevInputValue) => String(_inputValue));
            }
        }
    }

    return (
        <SetPagerNumEl>
            <label htmlFor="">ページ数を指定<input type="text" value={isInputValue} onInput={(inputEv: ChangeEvent<HTMLInputElement>) => {
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