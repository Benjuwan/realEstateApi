import { memo } from "react";
import styled from "styled-components";
import { SelectPrefs } from "./SelectPrefs";
import { FetchDataContents } from "./FetchDataContents";

export const FilterComponent = memo(() => {
    return (
        <Contents>
            <SelectPrefs pagerName="フィルター ver" />
            <FetchDataContents />
        </Contents>
    );
});

const Contents = styled.div`
width: clamp(320px, 100%, 640px);
margin: 0 auto 3em;

& button {
    cursor: pointer;
    appearance: none;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid transparent;
    line-height: 2;
}
`;