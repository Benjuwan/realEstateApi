import { memo } from "react";
import { SelectPrefs } from "../filter/SelectPrefs";
import { SelectCities } from "../filter/SelectCities";
import { CompareSelectTerm } from "./CompareSelectTerm";

export const CompareComponent = memo(() => {
    return (
        <>
            <SelectPrefs />
            <SelectCities />
            <CompareSelectTerm />
        </>
    );
});