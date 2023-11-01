export type estateInfoJsonData = {
    data: Array<estateInfoJsonDataContents>
}

export type estateInfoJsonDataContents = {
    Area: string;
    BuildingYear: string
    CityPlanning: string;
    CoverageRatio: string;
    Classification?: string;
    DistrictName: string;
    Direction?: string;
    FloorAreaRatio: string;
    FloorPlan: string;
    Frontage?: string;
    LandShape?: string;
    Municipality: string;
    MunicipalityCode: string;
    Period: string;
    Prefecture: string;
    Purpose: string;
    Region?: string;
    Renovation: string;
    Structure: string;
    TradePrice: string;
    Type: string;
    TotalFloorArea?: string;
    Use: string;
}