import { useContext } from "react";
import { estateInfoJsonData, estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { CompareGetFetchDataContext } from "../../providers/compare/CompareGetFetchData";
import { CompareGetFetchPrefCode } from "../../providers/compare/CompareGetFetchPrefCode";

export const useGetTradePrice = () => {
    const { setCompareGetFetchData } = useContext(CompareGetFetchDataContext);
    const { isGetFetchPrefCode } = useContext(CompareGetFetchPrefCode);

    const GetTradePrice = (
        cityCode: string = '27205', // 大阪府吹田市
        annualValue: string | number = 2023, // 2023年
    ) => {
        const ViewGetFetchData = async () => {
            const responese = await fetch(`https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=${annualValue}1&to=${annualValue}4&area=${isGetFetchPrefCode}&city=${cityCode}`);
            const resObj: estateInfoJsonData = await responese.json();
            const resObjDataAry: estateInfoJsonDataContents[] = resObj.data;

            if (responese.status === 200) {
                const resElAry: string[] = resObjDataAry.map(resEl => {
                    return resEl.TradePrice;
                });
                setCompareGetFetchData((_prevFetchAry) => resElAry); // スプレッド構文不使用（倍増防止）
            } else {
                console.log(responese.status);
            }
        }
        ViewGetFetchData();
    }

    return { GetTradePrice }
}