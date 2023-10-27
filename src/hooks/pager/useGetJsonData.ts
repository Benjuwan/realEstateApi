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
            const resObjDataAry: Array<estateInfoJsonDataContents> = resObj.data;

            if (responese.status === 200) {
                const newAry = [...isGetFetchData];
                resObjDataAry.forEach((resEl, i) => {
                    // console.log(i, resEl);
                    newAry.push(resEl);
                    setGetFetchData(newAry);
                });
            } else {
                console.log(responese.status);
            }
        }
        ViewGetFetchData();
    }
    
    return { GetJsonData }
}