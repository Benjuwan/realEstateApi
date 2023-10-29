import { useContext, useMemo, memo, FC } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonDataContents";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { ContentsItems } from "../ContentItmes";
import { BtnComponent } from "./BtnComponent";
import { usePager } from "../../hooks/pager/usePager";

type PagerIncDecType = {
    pagerLimitMaxNum: number;
}

export const PagerIncDec: FC<PagerIncDecType> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    /* 各種 Context */
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
    }, [isGetFetchData]); // 依存配列 isGetFetchData：コンテンツデータが取得・変更される度

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