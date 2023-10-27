import { useContext, memo, useMemo, useState, useEffect } from "react";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { PagerComponent } from "./PagerComponent";

export const PagerBaseComponent = memo(() => {
    const { isPagers, isGetFetchData } = useContext(GetFetchDataContext);

    /* ページャー機能（PagerPages.tsx / PagerIncDec.tsx）の切替用Bool */
    const [isPagerFrag, setPagerFrag] = useState<boolean>(true);

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

    return (
        <PagerComponent
            pagerLimitMaxNum={pagerLimitMaxNum}
            isPagerFrag={isPagerFrag}
            setPagerFrag={setPagerFrag}
        />
    );
});