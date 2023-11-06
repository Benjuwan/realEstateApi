import { useContext } from "react";
import { PagerGetFetchDataContext } from "../../providers/pager/PagerGetFetchData";
import { estateInfoJsonData, estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";

export const useGetJsonData = () => {
    const { isPagerGetFetchData, setPagerGetFetchData } = useContext(PagerGetFetchDataContext);

    const GetJsonData = (
        url: string
    ) => {
        const ViewGetFetchData = async () => {
            const responese = await fetch(url);
            const resObj: estateInfoJsonData = await responese.json();
            const resObjDataAry: estateInfoJsonDataContents[] = resObj.data;

            if (responese.status === 200) {
                const resElAry: estateInfoJsonDataContents[] = resObjDataAry.map((resEl, _i) => {
                    // console.log(i, resEl);
                    return resEl;
                });
                setPagerGetFetchData((_prevFetchAry) => [...isPagerGetFetchData, ...resElAry]);
            } else {
                console.log(responese.status);
            }
        }
        ViewGetFetchData();
    }

    return { GetJsonData }
}