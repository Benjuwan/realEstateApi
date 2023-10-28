import { memo, useContext, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";

export const SetPagerNum = memo(() => {
    const { setPagers, isOffSet } = useContext(GetFetchDataContext);

    /* input text State */
    const [isInputValue, setInputValue] = useState<string>('');
    const inputTxt = (inputEv: ChangeEvent<HTMLInputElement>) => {
        const inputElValue = inputEv.currentTarget.value;
        setInputValue((_prevInoutTxt) => inputElValue);
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
            if (shallowCopy[1] === '9') {
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
        } else {
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
            /* 入力値がオフセットの数値で割り切れる場合はそのまま処理を進める */
            setPagers((_prevPagerNum) => _inputValue);
            setInputValue((_prevInputValue) => String(_inputValue));
        } else {
            if (_inputValue >= isOffSet) {
                /* 入力値がオフセット以上の場合 */
                const offsetStrAry: string[] = String(isOffSet).split('');
                const offsetFirstDigit: number = Number(offsetStrAry[offsetStrAry.length - 1]);
                if (offsetFirstDigit === 5) {
                    /* オフセットの1の位が「5」の場合 */
                    if (parseInt(inputValue[inputValue.length - 1]) >= 5) {
                        /* 入力値の1桁目が 5 以上の場合は四捨五入メソッド（RoundingOff）で処理を進める */
                        RoundingOff(inputValue, true);
                    } else {
                        /* 入力値の1桁目が 5 以下の場合は四捨五入メソッド（RoundingOff）で処理を進める */
                        RoundingOff(inputValue);
                    }
                } else {
                    /* オフセットの1の位が「5」以外の場合 */
                    RoundingOff(inputValue);
                }
            } else {
                /* 入力値がオフセット以下の場合はオフセットの数値で処理を進める */
                setPagers((_prevPagerNum) => isOffSet);
                setInputValue((_prevInputValue) => String(isOffSet));
            }
        }
    }

    return (
        <SetPagerNumEl>
            <label htmlFor="">ページ数を指定<input type="text" value={isInputValue} onInput={(inputEv: ChangeEvent<HTMLInputElement>) => {
                inputTxt(inputEv);
            }} /></label>
            <button type="button" onClick={() => {
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

    &:hover {
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