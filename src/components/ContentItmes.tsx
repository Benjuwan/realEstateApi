import { memo, FC } from "react";
import { estateInfoJsonDataContents } from "../ts/estateInfoJsonData";

type ContentItemsProps = {
    aryEl: estateInfoJsonDataContents;
}

export const ContentsItems: FC<ContentItemsProps> = memo((props) => {
    const { aryEl } = props;

    /* fee を3桁区切りに */
    const toLocaleString = (targetWords: string) => parseInt(targetWords).toLocaleString();

    return (
        <>
            <div className="boxes categories">
                {aryEl.Type && <h2 className="type">{aryEl.Type}</h2>}
                {aryEl.Prefecture && <p className="Prefecture">{aryEl.Prefecture}</p>}
                {aryEl.Direction && <p className="direction">{aryEl.Direction}</p>}
            </div>
            <div className="boxes infos">
                {aryEl.Use && <p className="used">用途：{aryEl.Use}</p>}
                {aryEl.TradePrice && <p className="fee">￥{toLocaleString(aryEl.TradePrice)}</p>}
                {aryEl.Prefecture &&
                    <p className="districtName">{aryEl.Prefecture}
                        {aryEl.Municipality && <span>{aryEl.Municipality}</span>}
                        {aryEl.DistrictName && <span>{aryEl.DistrictName}</span>}
                    </p>
                }
                {aryEl.BuildingYear && <p className="buildingYear">{aryEl.BuildingYear}</p>}
                {aryEl.FloorPlan && <p className="floorPlan">{aryEl.FloorPlan}</p>}
                {aryEl.Area && <p className="area">面積（平方メートル）：{aryEl.Area}</p>}
                {aryEl.Structure && <p className="structure">{aryEl.Structure}</p>}
                {aryEl.Renovation && <p className="renovation">{aryEl.Renovation}</p>}
            </div>
            <div className="boxes otherInfo">
                {aryEl.Purpose && <p className="purpose">目的：{aryEl.Purpose}</p>}
                {aryEl.Period && <p className="period">取引時点：{aryEl.Period}</p>}
                {aryEl.CityPlanning &&
                    <p className="type">{aryEl.Type && <>取引の種類：{aryEl.Type}</>}
                        <span>{aryEl.CityPlanning}</span>
                    </p>
                }
                {aryEl.MunicipalityCode && <p className="municipalityCode">市区町村コード：{aryEl.MunicipalityCode}</p>}
                {aryEl.FloorAreaRatio && <p className="floorAreaRatio">容積率（％）：{aryEl.FloorAreaRatio}</p>}
                {aryEl.CoverageRatio && <p className="coverageRatio">建ぺい率（％）：{aryEl.CoverageRatio}</p>}
            </div>
        </>
    );
});