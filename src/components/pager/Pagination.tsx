import { FC, memo, useState, useEffect, useContext, useCallback } from "react";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";

type PaginationType = {
    pagerLimitMaxNum: number;
}

export const Pagination: FC<PaginationType> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    const { isGetFetchData, setPagers, isOffSet } = useContext(GetFetchDataContext);

    const [isPagination, setPagination] = useState<number[]>([]);

    const setPaginationNum = useCallback((btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setPagers((_prevPagerNum) => Number(btnEl.currentTarget.textContent));
    }, []);

    useEffect(() => {
        const srcAry: number[] = [];
        let srcNum: number = pagerLimitMaxNum;

        while (srcNum > isOffSet) {
            srcNum = srcNum - isOffSet;
            srcAry.push(srcNum);
        }

        const paginationAry: number[] = srcAry.map((pageNumEl, pagerNum) => {
            return pagerNum + 1;
        });

        setPagination((_prevPagination) => [...isPagination, ...paginationAry]);
    }, []); // isGetFetchData

    return (
        <>
            {isPagination.map((pagerEl, i) =>
                <button key={i} onClick={(btnEl) => {
                    setPaginationNum(btnEl);
                }}>{pagerEl}</button>
            )}
        </>
    );
});