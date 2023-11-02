import { FC, memo, useContext, useEffect, useState } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

/**
 * pager 単体で使用したい場合は下記の Context / Fragment を利用する。
 * 単体使用時は、コンテンツデータ用の配列など各種 State を下記 Context で用意したものに差し替える必要がある
*/
// import { PagerGetFetchDataContext } from "../../providers/pager/PagerGetFetchData";

type ContentsNumberType = {
    pagerLimitMaxNum: number;
    isPagerFrag: boolean;
}

export const ContentsNumber: FC<ContentsNumberType> = memo((props) => {
    const { pagerLimitMaxNum, isPagerFrag } = props;

    /* 各種 Context：ページャーのオフセットは isOffSet State で指定 */
    // const { isPagers, isOffSet } = useContext(PagerGetFetchDataContext);
    const { isPagers, isOffSet } = useContext(GetFetchDataContext);

    /* PagerPages.tsx で使用する上限値の表記用 State */
    const [isCtrlPagerNum, setCtrlPagerNum] = useState<number>(0);

    useEffect(() => {
        /* 次ページのコンテンツ数がオフセット数を下回っている場合は上限値をセット */
        if (isPagers > pagerLimitMaxNum - isOffSet) {
            setCtrlPagerNum((_prevCtrlPagerNum) => pagerLimitMaxNum);
        }
    }, [isPagers]);

    return (
        <p style={{ 'fontSize': '16px', 'textAlign': 'center', 'marginBottom': '1em' }}>
            {isPagerFrag ? // isPagerFrag：true = PagerPages.tsx, false = PagerIncDec.tsx
                <>
                    {isPagers + 1} - {isPagers > pagerLimitMaxNum - isOffSet ? isCtrlPagerNum : isPagers + isOffSet}件 / {pagerLimitMaxNum}
                </> :
                <>
                    1 - {isPagers > pagerLimitMaxNum ? isCtrlPagerNum :
                        <>{isPagers === 0 ? isPagers + isOffSet : isPagers}</>
                    }件 / {pagerLimitMaxNum}
                </>
            }
        </p>
    );
});