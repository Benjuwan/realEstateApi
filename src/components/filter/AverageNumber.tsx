import { useEffect, useState, useContext, memo } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

export const AverageNumber = memo(() => {
    const { isGetFetchData } = useContext(GetFetchDataContext);

    useEffect(() => {
        const averageCalcResult: string = averageCalc();
        setAveragePrice((_prevTxt) => averageCalcResult);
    }, [isGetFetchData]);

    const [isAveragePrice, setAveragePrice] = useState<string>('');
    const averageCalc = () => {
        const averageTradePriceEls: NodeListOf<HTMLElement> = document.querySelectorAll('.TradePrice');
        const averageTradePriceAry: number[] = [];
        averageTradePriceEls.forEach(el => {
            /* useToLocalString で 3桁区切りの文字列にしているために下記処理で調整して数値型へ変換 */
            const targetEl: string | null = el.textContent;
            const targetWord: string | undefined = targetEl?.split(',').join('');
            if (typeof targetWord !== "undefined") averageTradePriceAry.push(parseInt(targetWord));
        });
        const averageTradePrice: number = [...averageTradePriceAry].reduce((a, b) => a + b, 0);
        const averageNumber = Math.floor(averageTradePrice / isGetFetchData.length).toLocaleString();
        return averageNumber;
    }

    return isAveragePrice;
});