import { memo } from "react";
import styled from "styled-components";
import { SelectPrefs } from "../filter/SelectPrefs";
import { SelectCities } from "../filter/SelectCities";
import { CompareSelectTerm } from "./CompareSelectTerm";
import { CompareListsSortAction } from "./CompareListsSortAction";

export const CompareComponent = memo(() => {
    return (
        <CompareComponentEl>
            <div className="selectElsWrapper">
                <SelectPrefs />
                <SelectCities />
                <CompareSelectTerm />
            </div>
            <p id="prefCityName"></p>
            <CompareListsSortAction />
        </CompareComponentEl>
    );
});

const CompareComponentEl = styled.div`
padding: 2.5em;
width: clamp(320px, 100%, 960px);
margin: auto;

& button {
    cursor: pointer;
    appearance: none;
    line-height: 2;
    border-radius: 4px;
    border: 1px solid transparent;
    color: #fff;
    background-color: #333;
    padding: 0 1em;

    &[disabled] {
        background-color: #dadada;
        color: #eaeaea;
    }

    &:not([disabled]):hover {
        background-color: #fff;
        border-color: #333;
        color: #333;
    }
}

& #prefCityName {
    font-size: 16px;
    font-weight: bold;
}

& .selectElsWrapper{
    padding: 1em;
    border-radius: 4px;
    background-color: #dadada;
    margin-bottom: 1em;
    
    & form {
        & select {
            width: clamp(80px, 100%, 160px);
            margin-bottom: .5em;
        }
        
        &.CompareSelectTerm {
            width: clamp(80px, 100%, 160px);
            display: flex;
            align-items: flex-start;
            flex-flow: row wrap;
            gap: 2%;
            
            & select {
                width: 49%;
            }

            & button {
                width: 100%;
            }
        }
    }
}

& .AverageCalcLists{
    list-style: none;
    font-size: 14px;
    line-height: 1.6;

    & li {
        & span {
            font-weight: bold;
        }
    }
}
`;