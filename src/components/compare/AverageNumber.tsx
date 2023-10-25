import { useEffect, useState, useContext, memo } from "react";
import { GetFetchDataContext } from "../../providers/compare/GetFetchData";

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
            averageTradePriceAry.push(parseInt(`${el.textContent}`));
        });
        const averageTradePrice: number = averageTradePriceAry.reduce((a, b) => a + b, 0);
        const averageNumber = Math.floor(averageTradePrice / isGetFetchData.length).toLocaleString();
        return averageNumber;
    }

    return isAveragePrice;
});