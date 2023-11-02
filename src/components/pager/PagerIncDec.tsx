import { useContext, useMemo, memo, FC } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { ContentsItems } from "../ContentItmes";
import { BtnComponent } from "./BtnComponent";
import { usePager } from "../../hooks/pager/usePager";

/**
 * pager 単体で使用したい場合は下記の Context / Fragment を利用する。
 * ・単体使用時は、コンテンツデータ用の配列など各種 State を下記 Context で用意したものに差し替える必要がある
 * ・依存配列の値を変更する
*/
// import { PagerGetFetchDataContext } from "../../providers/pager/PagerGetFetchData";

type PagerIncDecType = {
    pagerLimitMaxNum: number;
}

export const PagerIncDec: FC<PagerIncDecType> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    /* 各種Context */
    // const { isPagerGetFetchData, isPagers, isOffSet } = useContext(PagerGetFetchDataContext);
    const { isGetFetchData, isPagers, isOffSet } = useContext(GetFetchDataContext);

    /* pager method */
    const { prevPagerIncDec, nextPagerIncDec } = usePager();

    /* 初期表示用およびページャー処理後の表示用コンテンツデータを用意 */
    const theContents: estateInfoJsonDataContents[] = useMemo(() => {
        return [...isGetFetchData].filter((el, i) => {
            /* 初期表示（オフセット分を表示） */
            if (isPagers <= 0 && i < isOffSet) {
                return el;
            }

            /* ページャー機能：コンテンツデータの随時追加・削除 */
            else {
                if (typeof pagerLimitMaxNum !== "undefined") {
                    if (isPagers > pagerLimitMaxNum) {
                        if (i < pagerLimitMaxNum) return el;
                    } else if (i < isPagers) {
                        return el;
                    }
                }
            }
        });
    }, [isPagers]);
    /* 単体使用時は isGetFetchData を依存配列に指定 */

    return (
        <>
            {theContents.map((el, i) => (
                <article key={i}>
                    <p>No.{i + 1}</p>
                    <ContentsItems aryEl={el} />
                </article>
            ))}
            <div style={{ 'display': 'flex', 'gap': '5%', 'justifyContent': 'space-between', 'width': '100%', 'margin': '0 auto 4em' }}>
                <BtnComponent btnTxt="PrevBtn"
                    disabledBool={isPagers <= isOffSet}
                    classNameTxt="Prev"
                    ClickEvent={prevPagerIncDec}
                />
                <BtnComponent btnTxt="NextBtn"
                    disabledBool={isPagers >= pagerLimitMaxNum}
                    classNameTxt="Next"
                    ClickEvent={nextPagerIncDec}
                />
            </div>
        </>
    );
});