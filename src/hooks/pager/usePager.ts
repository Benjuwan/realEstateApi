import { useContext } from 'react';
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

export const usePager = () => {
    /* 各種 Context：ページャーのオフセットは isOffSet State で指定 */
    const { isPagers, setPagers, isOffSet, isCurrPager, setCurrPager } = useContext(GetFetchDataContext);

    /* PagerIncDec.tsx：コンテンツデータの随時追加・削除ver */
    const prevPagerIncDec: () => void = () => {
        /* QuickFix：可能な場合は使用されていない全ての宣言にプレフィックスとして（'_'）を付ける */
        if (isPagers <= isOffSet) {
            setPagers((_prevNum) => isPagers + isOffSet);
        } else {
            setPagers((_prevNum) => isPagers - isOffSet);
        }
        setCurrPager((_prevCurrPager) => isCurrPager - 1); // setCurrPager：表示中のページ番号を変更する更新関数
    }

    const nextPagerIncDec: () => void = () => {
        if (isPagers <= 0) {
            setPagers((_prevNum) => isPagers + (isOffSet * 2));
        } else {
            setPagers((_prevNum) => isPagers + isOffSet);
        }
        setCurrPager((_prevCurrPager) => isCurrPager + 1);
    }

    /* PagerPages.tsx：ページ送りver */
    const prevPagerPages: () => void = () => {
        setPagers((_prevNum) => isPagers - isOffSet);
        setCurrPager((_prevCurrPager) => isCurrPager - 1);
    }

    const nextPagerPages: () => void = () => {
        setPagers((_prevNum) => isPagers + isOffSet);
        setCurrPager((_prevCurrPager) => isCurrPager + 1);
    }

    return { prevPagerIncDec, nextPagerIncDec, prevPagerPages, nextPagerPages }
}