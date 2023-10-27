import { FC, memo, useContext } from "react";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";

type ContentsNumberType = {
    pagerLimitMaxNum: number;
    isPagerFrag: boolean;
}

export const ContentsNumber: FC<ContentsNumberType> = memo((props) => {
    const { pagerLimitMaxNum, isPagerFrag } = props;

    /* 各種 Context：ページャーのオフセットは isOffSet State で指定 */
    const { isPagers, isOffSet } = useContext(GetFetchDataContext);

    return (
        <p style={{ 'fontSize': '16px', 'textAlign': 'center', 'marginBottom': '1em' }}>
            {isPagerFrag ?
                /* PagerPages.tsx でのみ isPagers が 0 or 10 の場合はオフセット分を加算した表記 */
                isPagers === 0 || 10 ? isPagers + isOffSet : isPagers :
                isPagers === 0 ? isPagers + isOffSet : isPagers
            }件 / {pagerLimitMaxNum}
        </p>
    );
});