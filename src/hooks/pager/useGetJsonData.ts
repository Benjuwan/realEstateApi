import { useContext } from "react";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { estateInfoJsonData } from "../../ts/estateInfoJsonData";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";

export const useGetJsonData = () => {
    const { isGetFetchData, setGetFetchData } = useContext(GetFetchDataContext);

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