import { memo, FC } from "react";
import { estateInfoJsonDataContents } from "../ts/estateInfoJsonDataContents";

type ContentItemsProps = {
    aryEl: estateInfoJsonDataContents;
}

export const ContentsItems: FC<ContentItemsProps> = memo((props) => {
    const { aryEl } = props;

    /* fee を3桁区切りに */
    const toLocaleString = (targetWords: string) => parseInt(targetWords).toLocaleString();

    return (
        <>
            <p>isPagerContents</p>
            <div className="boxes categories">
                <h2 className="type">{aryEl.Type}</h2>
                <p className="Prefecture">{aryEl.Prefecture}</p>
                {aryEl.Direction && <p className="direction">{aryEl.Direction}</p>}
            </div>
            <div className="boxes infos">
                <p className="used">用途：{aryEl.Use}</p>
                <p className="fee">￥{toLocaleString(aryEl.TradePrice)}</p>
                <p className="districtName">{aryEl.Prefecture}<span>{aryEl.Municipality}</span><span>{aryEl.DistrictName}</span></p>
                <p className="buildingYear">{aryEl.BuildingYear}</p>
                <p className="floorPlan">{aryEl.FloorPlan}</p>
                <p className="area">面積（平方メートル）：{aryEl.Area}</p>
                <p className="structure">{aryEl.Structure}</p>
                <p className="renovation">{aryEl.Renovation}</p>
            </div>
            <div className="boxes otherInfo">
                <p className="purpose">目的：{aryEl.Purpose}</p>
                <p className="period">取引時点：{aryEl.Period}</p>
                <p className="type">取引の種類：{aryEl.Type}<span>{aryEl.CityPlanning}</span></p>
                <p className="municipalityCode">市区町村コード：{aryEl.MunicipalityCode}</p>
                <p className="floorAreaRatio">容積率（％）：{aryEl.FloorAreaRatio}</p>
                <p className="coverageRatio">建ぺい率（％）：{aryEl.CoverageRatio}</p>
            </div>
        </>
    );
});