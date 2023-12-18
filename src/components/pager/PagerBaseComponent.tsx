import { useContext, memo, useMemo } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { SelectEls } from "../filter/SelectEls";
import { PagerComponent } from "./PagerComponent";

export const PagerBaseComponent = memo(() => {
    /* 各種 Context */
    const { isGetFetchData } = useContext(GetFetchDataContext);

    /* ページャー（コンテンツ数）上限値の決め打ち */
    const pagerLimitMaxNum: number = useMemo(() => {
        const getAryLength: number = isGetFetchData.length;
        return getAryLength;
    }, [isGetFetchData]);

    return (
        <PagerBaseElm>
            <SelectEls pagerName="pager" />
            <PagerComponent pagerLimitMaxNum={pagerLimitMaxNum} />
        </PagerBaseElm>
    );
});

const PagerBaseElm = styled.div`
width: clamp(320px, 100%, 960px);
margin: 0 auto 3em;
`;