import { memo } from "react";
import styled from "styled-components";
import { useFilterMethod } from "../../hooks/filter/useFilterMethod";
import { useSortMethod } from "../../hooks/filter/useSortMethod";

export const FilterActionBtns = memo(() => {
    const { ascClick, deskClick } = useSortMethod();
    const { ResetFilter } = useFilterMethod();

    return (
        <Btns className="btns">
            <button type="button" onClick={ascClick}>昇順</button>
            <button type="button" onClick={deskClick}>降順</button>
            <button type="button" onClick={ResetFilter}>リセット</button>
        </Btns>
    );
});

const Btns = styled.div`
margin-bottom: 2em;
display: flex;
justify-content: space-between;
background-color: #dadada;
padding: 1em 3em;
border-radius: 4px;
gap: 5%;
`;