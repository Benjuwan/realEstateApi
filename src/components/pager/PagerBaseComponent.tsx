import { useContext, memo, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { PagerComponent } from "./PagerComponent";
import { SelectPrefs } from "../filter/SelectPrefs";

/**
 * pager 単体で使用したい場合は下記の Context / Fragment を利用する。
 * 単体使用時は、コンテンツデータ用の配列など各種 State を下記 Context で用意したものに差し替える必要がある
*/
// import { PagerGetFetchDataContext } from "../../providers/pager/PagerGetFetchData";

export const PagerBaseComponent = memo(() => {
    /* 各種Context */
    // const { isPagers, isGetFetchData } = useContext(PagerGetFetchDataContext);
    const { isPagers, isGetFetchData } = useContext(GetFetchDataContext);

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
        <PagerBaseElm>
            <SelectPrefs />
            <PagerComponent pagerLimitMaxNum={pagerLimitMaxNum} />
        </PagerBaseElm>
    );
});

const PagerBaseElm = styled.div`
width: clamp(320px, 100%, 640px);
margin: auto;
padding: 0 2em;
`;