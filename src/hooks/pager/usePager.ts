import { useContext } from 'react';
import { GetFetchDataContext } from '../../providers/pager/GetFetchData';

export const usePager = () => {
    const { isPagers, setPagers, isOffSet } = useContext(GetFetchDataContext);

    const prevPager = () => {
        /* QuickFix：可能な場合は使用されていない全ての宣言にプレフィックスとして（'_'）を付ける */
        if (isPagers <= isOffSet) {
            setPagers((_prevNum) => isPagers + isOffSet);
        } else {
            setPagers((_prevNum) => isPagers - isOffSet);
        }
    }

    const nextPager = () => {
        if (isPagers <= 0) {
            setPagers((_prevNum) => isPagers + (isOffSet * 2));
        } else {
            setPagers((_prevNum) => isPagers + isOffSet);
        }
    }

    return { prevPager, nextPager }
}