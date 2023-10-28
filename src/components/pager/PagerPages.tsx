import { useContext, useState, useEffect, useCallback, memo, FC } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { Pagination } from "./Pagination";
import { SetPagerNum } from "./SetPagerNum";
import { ContentsItems } from "../ContentItmes";
import { BtnComponent } from "./BtnComponent";
import { usePager } from "../../hooks/pager/usePager";

type PagerPagesType = {
    pagerLimitMaxNum: number;
}

export const PagerPages: FC<PagerPagesType> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    /* 各種 Context */
    const { isGetFetchData, isPagers, isOffSet } = useContext(GetFetchDataContext);

    /* pager method */
    const { prevPagerPages, nextPagerPages } = usePager();

    /* ページャー機能：splice メソッドで処理 */
    const [isPagerContents, setPagerContents] = useState<estateInfoJsonDataContents[]>([]);
    const setPagerContentsFrag = useCallback((
        fragStart: number = isPagers,
        fragFinish: number = isOffSet
    ) => {
        /* 始点：ページャー数、終点：ページャー数 + オフセット数 */
        const shallowCopy: estateInfoJsonDataContents[] = [...isGetFetchData];
        const splicedContents: estateInfoJsonDataContents[] = shallowCopy.splice(fragStart, fragFinish);
        setPagerContents((_prevPagerContents) => splicedContents);
    }, [isGetFetchData]); // 依存配列 isGetFetchData：コンテンツデータが取得・変更される度

    useEffect(() => {
        /* ページャー機能：ページ送り */
        if (typeof pagerLimitMaxNum !== "undefined") {
            const limitBorderLine: number = pagerLimitMaxNum - isOffSet;
            if (isPagers >= limitBorderLine) {
                const remandNum: number = pagerLimitMaxNum - isPagers;
                setPagerContentsFrag(isPagers, remandNum);
            } else {
                setPagerContentsFrag();
            }
        }
    }, [isGetFetchData]); // 依存配列 isGetFetchData：コンテンツデータが取得・変更される度

    return (
        <>
            {/* <Pagination pagerLimitMaxNum={pagerLimitMaxNum} /> */}
            <SetPagerNum />
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
                    disabledBool={isPagers >= (pagerLimitMaxNum - isOffSet)} classNameTxt="Next"
                    ClickEvent={nextPagerPages}
                />
            </div>
        </>
    );
});