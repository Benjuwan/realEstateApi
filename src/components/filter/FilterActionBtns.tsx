import { memo } from "react";
import { useFilterMethod } from "../../hooks/filter/useFilterMethod";
import { useSortMethod } from "../../hooks/filter/useSortMethod";

export const FilterActionBtns = memo(() => {
    const { ascClick, deskClick } = useSortMethod();
    const { ResetFilter } = useFilterMethod();

    return (
        <div className="btns">
            <button type="button" onClick={ascClick}>昇順</button>
            <button type="button" onClick={deskClick}>降順</button>
            <button type="button" onClick={ResetFilter}>リセット</button>
        </div>
    );
});