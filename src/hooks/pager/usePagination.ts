import { useContext } from "react";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";

export const usePagination = () => {
    const { isOffSet } = useContext(GetFetchDataContext);

    /* for PagerPages.tsx */
    const PaginationPagesVer = (
        dataPagerAry: string[] | undefined,
        targetOffsetFirstDigit: number
    ) => {
        let dataPagerResult: string = '';
        if (typeof dataPagerAry !== 'undefined') {
            if (targetOffsetFirstDigit === 5) {
                /* オフセットの1桁目が「5」の場合 */
                return dataPagerResult = dataPagerAry.join(''); // 早期リターンで処理終了
            }

            /* オフセットの1桁目が「5」でない場合 */
            if (parseInt(dataPagerAry[dataPagerAry.length - 1]) > 0) {
                const shallowCopy: string[] = [...dataPagerAry];
                const splicedData: string[] = shallowCopy.splice(dataPagerAry.length - 1, 1, '0');
                // console.log(splicedData, shallowCopy, dataPagerAry);
                dataPagerResult = shallowCopy.join('');
            } else {
                dataPagerResult = dataPagerAry.join('');
            }
        }
        return dataPagerResult;
    }

    /* for PagerIncDec.tsx */
    const PaginationIncDecVer = (
        dataPagerAry: string[] | undefined,
        targetOffsetFirstDigit: number,
        pagerLimitMaxNum: number
    ) => {
        let dataPagerResult: string = '';
        if (typeof dataPagerAry !== 'undefined') {
            if (targetOffsetFirstDigit === 5) {
                /* オフセットの1桁目が「5」の場合 */
                const dataPagerValue: number = parseInt(dataPagerAry.join('')); // ページャー番号（Pagination.tsx の JSX にある'data-pager'データ）
                if (isOffSet >= pagerLimitMaxNum - dataPagerValue) {
                    /* dataPager の数値が上限値直前の場合、上限値をリターン */
                    return dataPagerResult = String(pagerLimitMaxNum);
                } else if (dataPagerValue >= 5) {
                    /* dataPager の数値が5以上の場合、オフセット数値を加算した内容をリターン */
                    const adjustNumStr: number = dataPagerValue + isOffSet
                    return dataPagerResult = String(adjustNumStr);
                } else {
                    return dataPagerResult = dataPagerAry.join(''); // 早期リターン
                }
            }

            /* ページャー番号の 1桁目が 0 以上場合 */
            if (parseInt(dataPagerAry[dataPagerAry.length - 1]) > 0) {
                const shallowCopy: string[] = [...dataPagerAry];
                const targetDigit: string = shallowCopy[shallowCopy.length - 2];
                if (targetDigit === undefined) {
                    /* ページャー番号（Pagination.tsx の JSX にある'data-pager'データ）が1桁の場合 */
                    return dataPagerResult = '10'; // 早期リターン
                } else {
                    /* 2桁目以降を'0'に変更 */
                    for (let i = 0; i < shallowCopy.length; i++) {
                        if (i >= 1) {
                            /* splice は破壊的な配列処理 */
                            shallowCopy.splice(i, 1, '0');
                        }
                    }

                    if (dataPagerAry[1] === '9') {
                        /* 2桁目が「9」の場合*/
                        // console.log(shallowCopy, dataPagerAry);
                        const setForFirstDigit: string = `${dataPagerAry[0]}${dataPagerAry[1]}`;
                        const splicedData: string[] = shallowCopy.splice(0, 1, `${parseInt(setForFirstDigit) + 1}`);
                        shallowCopy.pop(); // 末尾の不要な'0'を削除 
                        // console.log(splicedData);
                    } else {
                        /* 2桁目が「9」ではない場合*/
                        const splicedData: string[] = shallowCopy.splice(dataPagerAry.length - 2, 1, `${parseInt(targetDigit) + 1}`);
                        // console.log(splicedData);
                    }
                }
                // console.log(shallowCopy, dataPagerAry);
                dataPagerResult = shallowCopy.join('');
            } else {
                dataPagerResult = dataPagerAry.join('');
            }
        }
        return dataPagerResult;
    }

    return { PaginationPagesVer, PaginationIncDecVer }
}