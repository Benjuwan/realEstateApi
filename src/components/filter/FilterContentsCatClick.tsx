import { memo, FC } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { useFilterMethod } from "../../hooks/filter/useFilterMethod";

type filterAryProps = {
    aryEl: estateInfoJsonDataContents;
    classNameStr?: string;
}

export const FilterContentsCatClick: FC<filterAryProps> = memo((props) => {
    const { aryEl, classNameStr = 'simpleBtn' } = props;
    const { FilterType } = useFilterMethod();

    return (
        <button type="button" className={classNameStr} onClick={(btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            FilterType(btnEl.currentTarget.textContent);
        }}>{aryEl.Type}</button>
    );
});