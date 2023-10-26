import { useContext, memo, useMemo, useState, useEffect } from "react";
import { GetFetchDataContext } from "../../providers/lists/GetFetchData";
import { Contents } from "./Contents";
import { BtnComponent } from "./BtnComponent";
import { usePager } from "../../hooks/lists/usePager";

export const ListsComponent = memo(() => {
    /* ページャーのオフセットは GetFetchData.tsx の isOffSet State で指定 */
    const { isPagers, isGetFetchData, isOffSet } = useContext(GetFetchDataContext);

    /* 再レンダリングの度に isGetFetchData.length が倍数（×2）されていくので上限値（初期読込時の isGetFetchData.length）を決め打ちするための計算用 State */
    const [isForCalcNum, setForCalcNum] = useState<number>(0);
    useEffect(() => {
        setForCalcNum((_prevForCalcNum) => isForCalcNum + 1);
    }, [isPagers]); // 依存配列 isPagers：ページャー数に変更があった場合のみカウントアップ

    /* ページャー（コンテンツ数）上限値の決め打ち */
    const pagerLimitMaxNum: number = useMemo(() => {
        const getAryLength: number = isGetFetchData.length / isForCalcNum;
        return getAryLength;
    }, [isGetFetchData]);
    // console.log(pagerLimitMaxNum);

    /* pager method */
    const { prevPager, nextPager } = usePager();

    return (
        <>
            <Contents pagerLimitMaxNum={pagerLimitMaxNum} />
            <div style={{ 'display': 'flex', 'gap': '5%', 'justifyContent': 'space-between', 'maxWidth': '640px', 'margin': '0 auto 4em' }}>
                <BtnComponent btnTxt="PrevBtn"
                    disabledBool={isPagers <= isOffSet}
                    classNameTxt="Prev"
                    ClickEvent={prevPager}
                />
                <BtnComponent btnTxt="NextBtn"
                    /* isPagers >= (pagerLimitMaxNum - isOffSet)：ページャー数が残りの取得予定コンテンツデータ数を超えてしまう場合は操作不可 */
                    disabledBool={isPagers >= (pagerLimitMaxNum - isOffSet)} classNameTxt="Next"
                    ClickEvent={nextPager}
                />
            </div>
        </>
    );
});