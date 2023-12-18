import { useContext } from "react";
import { estateInfoJsonData, estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { GetFetchPrefCode } from "../../providers/filter/GetFetchPrefCode";

export const useGetJsonDataXai = () => {
    const { setGetFetchData, setLoading } = useContext(GetFetchDataContext);
    const { isGetFetchPrefCode } = useContext(GetFetchPrefCode);

    /* *1：（1:1月～3月、2:4月～6月、3:7月～10月、4:11月～12月）*/
    const GetJsonDataXai: (
        cityCode?: string,
        fromValue?: string | number,
        toValue?: string | number
    ) => void = (
        cityCode: string = '27205', // 大阪府吹田市
        fromValue: string | number = 20231, // 取引の計測開始時期：2023年第1四半期（*1）
        toValue: string | number = 20232 // 取引の計測終了時期：2023年第2四半期
    ) => {
            const GetFetchData: () => Promise<void> = async () => {
                setLoading(true); // true：読み込み中

                const responese = await fetch(`https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=${fromValue}&to=${toValue}&area=${isGetFetchPrefCode}&city=${cityCode}`);
                const resObj: estateInfoJsonData = await responese.json();
                // console.log(resObj);
                const resObjDataAry: estateInfoJsonDataContents[] = resObj.data;

                if (responese.status === 200) {
                    const resElAry: estateInfoJsonDataContents[] = resObjDataAry.map(resEl => resEl);
                    setGetFetchData((_prevFetchAry) => resElAry); // [...AryEls]：スプレッド構文は使用しない

                    setLoading(false); // false：読み込み完了
                } else {
                    console.error(responese.status);
                }
            }
            GetFetchData();
        }
    return { GetJsonDataXai }
}