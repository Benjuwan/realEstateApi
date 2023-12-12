import { memo, FC } from "react";
import { ContentsItems } from "./ContentItmes";
import { useViewDetails } from "../hooks/useViewDetails";
import { estateInfoJsonDataContents } from "../ts/estateInfoJsonData";

type hiddenDetailsContentType = {
    aryEl: estateInfoJsonDataContents;
}

export const HiddenDetailsContent: FC<hiddenDetailsContentType> = memo(({ aryEl }) => {
    /* 詳細情報の表示機能（モーダル）*/
    const { ViewDetails } = useViewDetails();

    return (
        <>
            <button type="button" className="detailsViewBtn" onClick={((btnEl) => ViewDetails(btnEl.currentTarget))}>詳細情報</button>
            <div className="details" onClick={((divEl) => ViewDetails(divEl.currentTarget))}>
                <div className="contentsWrapper">
                    <ContentsItems aryEl={aryEl} />
                </div>
            </div>
        </>
    );
});