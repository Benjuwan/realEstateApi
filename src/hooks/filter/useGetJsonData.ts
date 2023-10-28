import { useContext } from "react";
import { estateInfoJsonData } from "../../ts/estateInfoJsonData";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { CityName } from "../../providers/filter/CityName";

export const useGetJsonData = () => {
    const { isGetFetchData, setGetFetchData } = useContext(GetFetchDataContext);
    const { setCityName } = useContext(CityName);

    const GetJsonData = (
        url: string
    ) => {
        const ViewGetFetchData = async () => {
            const responese = await fetch(url);
            const resObj: estateInfoJsonData = await responese.json();
            const resObjDataAry: estateInfoJsonDataContents[] = resObj.data;

            if (responese.status === 200) {
                const resElAry: estateInfoJsonDataContents[] = resObjDataAry.map((resEl, i) => {
                    // console.log(i, resEl);
                    setCityName((_prevTxt) => resEl.Municipality);
                    return resEl;
                });
                setGetFetchData((_prevFetchAry) => [...isGetFetchData, ...resElAry]);
            } else {
                console.log(responese.status);
            }
        }
        ViewGetFetchData();
    }
    return { GetJsonData }
}