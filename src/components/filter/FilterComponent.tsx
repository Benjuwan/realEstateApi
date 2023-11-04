import { memo } from "react";
import styled from "styled-components";
import { SelectEls } from "./SelectEls";
import { FetchDataContents } from "./FetchDataContents";

export const FilterComponent = memo(() => {
    return (
        <Contents>
            <SelectEls pagerName="filter" />
            <FetchDataContents />
        </Contents>
    );
});

const Contents = styled.div`
width: clamp(320px, 100%, 960px);
margin: 0 auto 3em;

& button {
    cursor: pointer;
    appearance: none;
    border-radius: 4px;
    border: 1px solid transparent;
    line-height: 2;
}
`;