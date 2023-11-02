import { useContext, useState, useEffect, useCallback, memo, FC } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { InputPagerNum } from "./InputPagerNum";
import { ContentsItems } from "../ContentItmes";
import { BtnComponent } from "./BtnComponent";
import { usePager } from "../../hooks/pager/usePager";

/**
 * pager 単体で使用したい場合は下記の Context / Fragment を利用する。
 * ・単体使用時は、コンテンツデータ用の配列など各種 State を下記 Context で用意したものに差し替える必要がある
 * ・依存配列の値を変更する
*/
// import { PagerGetFetchDataContext } from "../../providers/pager/PagerGetFetchData";

type PagerPagesType = {
    pagerLimitMaxNum: number;
}

export const PagerPages: FC<PagerPagesType> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    /* 各種Context */
    // const { isPagerGetFetchData, isPagers, isOffSet } = useContext(PagerGetFetchDataContext);
    const { isGetFetchData, isPagers, isOffSet } = useContext(GetFetchDataContext);

    /* pager method */
    const { prevPagerPages, nextPagerPages } = usePager();

    /* ページャー機能：splice メソッドで処理 */
    const [isPagerContents, setPagerContents] = useState<estateInfoJsonDataContents[]>([]);
    const setPagerContentsFrag = useCallback((
        fragStart: number = isPagers, // 始点（fragStart）：ページャー数
        fragFinish: number = isOffSet // 終点（fragFinish）：オフセット数
    ) => {
        const shallowCopy: estateInfoJsonDataContents[] = [...isGetFetchData];
        const splicedContents: estateInfoJsonDataContents[] = shallowCopy.splice(fragStart, fragFinish);
        setPagerContents((_prevPagerContents) => splicedContents);
    }, [isPagers]);
    /* 単体使用時は isGetFetchData を依存配列に指定 */

    useEffect(() => {
        /* ページャー機能：ページ送り */
        if (typeof pagerLimitMaxNum !== "undefined") {
            const limitBorderLine: number = pagerLimitMaxNum - isOffSet;
            if (isPagers >= limitBorderLine) {
                const remandNum: number = pagerLimitMaxNum - isPagers;
                setPagerContentsFrag(isPagers, remandNum); // 終点：残りのコンテンツ数
            } else {
                setPagerContentsFrag();
            }
        }
    }, [isPagers]);
    /* 単体使用時は isGetFetchData を依存配列に指定 */

    return (
        <>
            {isOffSet % 5 === 0 &&
                /*（調整不足で）オフセット数が 5 の倍数以外では意図した挙動にならないので条件を設けてコンポーネントを呼び出す */
                <InputPagerNum pagerLimitMaxNum={pagerLimitMaxNum} />
            }
            {isPagerContents.map((el, i) => (
                <article key={i}>
                    <ContentsItems aryEl={el} />
                </article>
            ))}
            <div style={{ 'display': 'flex', 'gap': '5%', 'justifyContent': 'space-between', 'width': '100%', 'margin': '0 auto 4em' }}>
                <BtnComponent btnTxt="PrevBtn"
                    disabledBool={isPagers <= 0}
                    classNameTxt="Prev"
                    ClickEvent={prevPagerPages}
                />
                <BtnComponent btnTxt="NextBtn"
                    /* isPagers >= (pagerLimitMaxNum - isOffSet)：ページャー数が残りの取得予定コンテンツデータ数を超えてしまう場合は操作不可 */
                    disabledBool={isPagers >= (pagerLimitMaxNum - isOffSet)} classNameTxt="Next"
                    ClickEvent={nextPagerPages}
                />
            </div>
        </>
    );
});