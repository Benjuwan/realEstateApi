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
            // console.log(resObj);
            const resObjDataAry: Array<estateInfoJsonDataContents> = resObj.data;

            if (responese.status === 200) {
                const newAry = [...isGetFetchData];
                resObjDataAry.forEach((resEl, i) => {
                    // console.log(i, resEl);
                    newAry.push(resEl);
                    setGetFetchData(newAry);
                    setCityName((_prevTxt) => resEl.Municipality);
                });
            } else {
                console.log(responese.status);
            }
        }
        ViewGetFetchData();
    }
    return { GetJsonData }
}