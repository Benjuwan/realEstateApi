import { useContext } from 'react';
import { GetFetchDataContext } from '../../providers/pager/GetFetchData';

export const usePager = () => {
    const { isPagers, setPagers, isOffSet } = useContext(GetFetchDataContext);

    /* PagerIncDec.tsx：コンテンツデータの随時追加・削除ver */
    const prevPagerIncDec = () => {
        /* QuickFix：可能な場合は使用されていない全ての宣言にプレフィックスとして（'_'）を付ける */
        if (isPagers <= isOffSet) {
            setPagers((_prevNum) => isPagers + isOffSet);
        } else {
            setPagers((_prevNum) => isPagers - isOffSet);
        }
    }

    const nextPagerIncDec = () => {
        if (isPagers <= 0) {
            setPagers((_prevNum) => isPagers + (isOffSet * 2));
        } else {
            setPagers((_prevNum) => isPagers + isOffSet);
        }
    }

    /* PagerPages.tsx：ページ送りver */
    const prevPagerPages = () => {
        setPagers((_prevNum) => isPagers - isOffSet);
    }

    const nextPagerPages = () => {
        setPagers((_prevNum) => isPagers + isOffSet);
    }

    return { prevPagerIncDec, nextPagerIncDec, prevPagerPages, nextPagerPages }
}