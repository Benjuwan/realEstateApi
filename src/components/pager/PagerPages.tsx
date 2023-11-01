import { useContext, useState, useEffect, useCallback, memo, FC } from "react";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { InputPagerNum } from "./InputPagerNum";
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
        fragStart: number = isPagers, // 始点（fragStart）：ページャー数
        fragFinish: number = isOffSet // 終点（fragFinish）：オフセット数
    ) => {
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
                setPagerContentsFrag(isPagers, remandNum); // 終点：残りのコンテンツ数
            } else {
                setPagerContentsFrag();
            }
        }
    }, [isGetFetchData]); // 依存配列 isGetFetchData：コンテンツデータが取得・変更される度

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