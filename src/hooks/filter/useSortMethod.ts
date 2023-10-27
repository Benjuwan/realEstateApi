import { useContext } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

export const useSortMethod = () => {
    const { isGetFetchData, setGetFetchData } = useContext(GetFetchDataContext);

    /* ソート機能 */
    const SortMethod = (sortType: string) => {
        if (sortType === '昇順') {
            /* オブジェクトの配列は key（プロパティ）の値を比較することで並べ替えが可能 */
            return [...isGetFetchData].sort((aheadEl, behindEl) => parseInt(aheadEl.TradePrice) - parseInt(behindEl.TradePrice));
        } else if (sortType === '降順') {
            /* オブジェクトの配列は key（プロパティ）の値を比較することで並べ替えが可能 */
            return [...isGetFetchData].sort((aheadEl, behindEl) => parseInt(behindEl.TradePrice) - parseInt(aheadEl.TradePrice));
        }
    }

    /* 昇順 */
    const ascClick = () => {
        const askAry: Array<estateInfoJsonDataContents> | undefined = SortMethod('昇順');
        if (askAry !== undefined) {
            setGetFetchData((_prevAry) => askAry);
        }
    }

    /* 降順 */
    const deskClick = () => {
        const deskAry: Array<estateInfoJsonDataContents> | undefined = SortMethod('降順');
        if (deskAry !== undefined) {
            setGetFetchData((_prevAry) => deskAry);
        }
    }

    return { SortMethod, ascClick, deskClick }
}