import { memo } from "react";
import styled from "styled-components";
import { SelectPrefs } from "./SelectPrefs";
import { FilterActionBtns } from "./FilterActionBtns";
import { FetchDataContents } from "./FetchDataContents";

export const FilterComponent = memo(() => {
    return (
        <Contents>
            <SelectPrefs />
            <FilterActionBtns />
            <FetchDataContents />
        </Contents>
    );
});

const Contents = styled.div`
width: clamp(320px, 100%, 640px);
padding: 0 2em;
margin: auto;

& button {
    cursor: pointer;
    appearance: none;
    border-radius: 4px;
    background-color: transparent;
    border: 1px solid;
    width: 100%;
}
`;