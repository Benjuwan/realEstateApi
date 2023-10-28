import { FC, memo, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { usePagination } from "../../hooks/pager/usePagination";

type PaginationType = {
    pagerLimitMaxNum: number;
    isPagerFrag?: boolean;
}

export const Pagination: FC<PaginationType> = memo((props) => {
    const { pagerLimitMaxNum, isPagerFrag } = props;

    /* 各種Context */
    const { isGetFetchData, setPagers, isOffSet } = useContext(GetFetchDataContext);

    /* ページ数：コンテンツデータ数をオフセットで分割した数 */
    const [isPagination, setPagination] = useState<number[]>([]);

    /* ページャー数 */
    const [isPagerNum, setPagerNum] = useState<number[]>([]);

    /* ページャー機能（PagerPages.tsx / PagerIncDec.tsx）切替に伴う調整用のカスタムメソッド */
    const { PaginationPagesVer, PaginationIncDecVer } = usePagination();

    /* 各ページャー項目の生成 */
    const setPaginationNum = (btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const dataPager: string | null = btnEl.currentTarget.getAttribute('data-pager');
        const dataPagerAry: string[] | undefined = dataPager?.split('');

        /* PagerPages.tsx / PagerIncDec.tsx で機能切替 */
        let dataPagerResult: string = '';
        if (isPagerFrag) dataPagerResult = PaginationPagesVer(dataPagerAry); // for PagerPages.tsx
        else dataPagerResult = PaginationIncDecVer(dataPagerAry); // for PagerIncDec.tsx

        /* 加工（1の位を0に固定）したカスタムデータ属性（data-pager）の値をセット */
        setPagers((_prevPagerNum) => Number(dataPagerResult));
    }

    useEffect(() => {
        /* 初期表示時（isPagination が 0件）という条件を指定して再レンダリングに伴う倍数増加（下記処理実行）を防止 */
        if (isPagination.length <= 0) {
            const srcAry: number[] = [];
            let srcNum: number = pagerLimitMaxNum;
            while (srcNum >= 0) {
                srcAry.unshift(srcNum);
                srcNum = srcNum - isOffSet;
            }

            setPagerNum((_prevPagerNum) => srcAry); // ページャー数をセット

            const paginationAry: number[] = srcAry.map((pageNumEl, pagerNum) => {
                return pagerNum + 1;
            });
            setPagination((_prevPagination) => [...isPagination, ...paginationAry]); // ページ数をセット
        }
    }, [isGetFetchData]);

    return (
        <Paginations>
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