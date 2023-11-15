import { FC, memo, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

/**
 * pager 単体で使用したい場合は下記の Context / Fragment を利用する。
 * 単体使用時は、コンテンツデータ用の配列など各種 State を下記 Context で用意したものに差し替える必要がある
*/
// import { PagerGetFetchDataContext } from "../../providers/pager/PagerGetFetchData";

type PaginationType = {
    pagerLimitMaxNum: number;
    isPagerFrag?: boolean;
}

export const Pagination: FC<PaginationType> = memo((props) => {
    const { pagerLimitMaxNum, isPagerFrag } = props;

    /* 各種Context */
    // const { isPagerGetFetchData, setPagers, isOffSet } = useContext(PagerGetFetchDataContext);
    const { isGetFetchData, setPagers, isOffSet, isCurrPager, setCurrPager } = useContext(GetFetchDataContext);

    /* ページ数：コンテンツデータ数をオフセットで分割した数 */
    const [isPagination, setPagination] = useState<number[]>([]);

    /* ページャー数 */
    const [isPagerNum, setPagerNum] = useState<number[]>([]);

    /* 各ページャー項目の data-pager の値に準じたページを表示及びページ番号を変更 */
    const setPaginationNum = (btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const dataPager: string | null = btnEl.currentTarget.getAttribute('data-pager');
        if (isPagerFrag) {
            setPagers((_prevPagerNum) => Number(dataPager));
        } else {
            setPagers((_prevPagerNum) => Number(dataPager) + isOffSet); // PagerIncDec.tsx ではオフセット数を加算（随時追加という仕様により初期表示時点でオフセットの1セット目分が表示されているため）
        }

        /* 表示中のページ番号を変更 */
        const currPager: string | null = btnEl.currentTarget.textContent
        setCurrPager((_prevCurrPage) => Number(currPager));
    }

    /* オフセット数に基づいた計算を通してページネーション用の各ページャー項目のページを設定する */
    const basedonOffsetNum_setPagerNum = () => {
        /* 初期表示時（isPagination が 0件）という条件を指定して再レンダリングに伴う倍数増加（下記処理実行）を防止 */
        if (isPagination.length <= 0) {
            const srcAry: number[] = [];
            let srcNum: number = pagerLimitMaxNum;

            /* 各ページャー項目の data-pager の値を生成（引算用途の上限数値：srcNum が 0 を切るまでオフセット数を倍数していくループ処理）*/
            let Accumuration = 0;
            while (srcNum >= 0) {
                srcAry.push(isOffSet * Accumuration);
                Accumuration++;
                srcNum = srcNum - isOffSet;
            }
            setPagerNum((_prevPagerNum) => [...isPagerNum, ...srcAry]); // ページャー数をセット

            const paginationAry: number[] = [];
            for (let i = 1; i <= srcAry.length; i++) {
                paginationAry.push(i);
            }
            setPagination((_prevPagination) => [...isPagination, ...paginationAry]); // ページ数をセット
        }
    }
    useEffect(() => {
        basedonOffsetNum_setPagerNum();
    }, [isGetFetchData]);

    return (
        <Paginations>
            <p id="currPage">現在「{isCurrPager}」ページ目</p>
            {isPagination.map((pagerEl, i) =>
                /* data-pager：ページャー数がセットされたカスタムデータ */
                <button key={i} data-pager={isPagerNum[i]} onClick={(btnEl) => {
                    setPaginationNum(btnEl);
                }}>{pagerEl}</button>
            )}
        </Paginations>
    );
});

const Paginations = styled.div`
width: 100%;
margin: 0 auto 1em;
display: flex;
flex-flow: row wrap;
gap: 2%;

& #currPage{
    font-size: 12px;
    width: 100%;
}

& button{
    cursor: pointer;
    appearance: none;
    border: 1px solid #dadada;
    border-radius: 0;
    background-color: #eaeaea;
    min-width: 32px;
    margin-bottom: .5em;

    &:hover{
        background-color: #333;
        color: #fff;
        border-color: #fff;
    }
}
`;