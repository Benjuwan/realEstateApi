import { useContext } from "react";
import { estateInfoJsonData, estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { CompareLoadingState } from "../../providers/compare/CompareLoadingState";
import { GetFetchPrefCode } from "../../providers/filter/GetFetchPrefCode";

export const useGetTradePrice = () => {
    const { setCompareLoading } = useContext(CompareLoadingState);
    const { isGetFetchPrefCode } = useContext(GetFetchPrefCode);

    /* 取得した tradePrice データから平均価格を算出 */
    const _AverageCalc = (
        annualYear: number,
        resElAry: string[]
    ) => {
        /* . を年間数値（annualYear）へ置換 */
        const replaceannualYearAry: (string | number)[] = [...resElAry].map(dataEl => {
            if (dataEl === '.') return annualYear;
            else return dataEl;
        });
        // console.log(replaceannualYearAry);

        /* reduce 処理のために加工 */
        const allTradePrices: number[] = [...replaceannualYearAry].filter(filterEl => {
            return typeof filterEl !== "number"; // annualYear を除外
        }).map(dataEl => {
            return Number(dataEl); // 数値型へ変換
        });

        /* 全価格を合算して平均価格を算出する */
        const reduceResult: number = allTradePrices.reduce((a, b) => a + b, 0);
        const averageNumber: number = reduceResult / resElAry.length;

        /* 平均価格を 3桁区切りにして返却 */
        const averageResultStr: string = `￥${Math.floor(averageNumber).toLocaleString()}`;
        console.log(annualYear, averageResultStr);

        return averageResultStr;
    }

    const GetTradePrice = (
        cityCode: string = '27205', // 大阪府吹田市
        annualValue: number = 2023, // 2023年
    ) => {
        const ViewGetFetchData = async () => {
            setCompareLoading(true); // 計測ボタンの disabled を設定
            const responese = await fetch(`https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=${annualValue}1&to=${annualValue}4&area=${isGetFetchPrefCode}&city=${cityCode}`); // ${annualValue}1～4で年間
            const resObj: estateInfoJsonData = await responese.json();
            const resObjDataAry: estateInfoJsonDataContents[] = resObj.data;

            if (responese.status === 200) {
                const resElAry: string[] = resObjDataAry.map((resEl, i) => {
                    if (i === resObjDataAry.length - 1) {
                        return resEl.TradePrice, '.'; // 年間データの処理完了シグナルとして
                    } else {
                        return resEl.TradePrice;
                    }
                });
                _AverageCalc(annualValue, resElAry); // 平均価格を算出
                setCompareLoading(false); // 計測ボタンの disabled を解除
            } else {
                console.log(responese.status);
            }
        }
        ViewGetFetchData();
    }

    return { GetTradePrice }
}