import { memo } from "react";
import styled from "styled-components";
import { SelectPrefs } from "./SelectPrefs";
import { FetchDataContents } from "./FetchDataContents";

export const FilterComponent = memo(() => {
    return (
        <Contents>
            <SelectPrefs />
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
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid;
    line-height: 2;
}
`;