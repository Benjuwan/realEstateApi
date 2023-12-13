import { useContext, useState, useEffect, useCallback, memo, FC } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { InputPagerNum } from "./InputPagerNum";
import { BtnComponent } from "./BtnComponent";
import { HiddenDetailsContent } from "../HiddenDetailsContent";
import { usePager } from "../../hooks/pager/usePager";
import { useToLocalString } from "../../hooks/useToLocalString";

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
    /* 単体使用時は isGetFetchData, isPagers を依存配列に指定 */

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
    /* 単体使用時は isGetFetchData, isPagers を依存配列に指定 */

    /* fee を3桁区切りに */
    const { ToLocalString } = useToLocalString();

    return (
        <>
            <InputPagerNum pagerLimitMaxNum={pagerLimitMaxNum} />
            {isPagerContents.map((el, i) => (
                <PagerArticleContents key={i}>
                    <h2>{el.Type}</h2>
                    {el.Purpose ?
                        <p>目的：{el.Purpose}</p> :
                        <p>用途：{el.Use}</p>
                    }
                    <p>￥{ToLocalString(el.TradePrice)}</p>
                    <p className="districtName">{el.Prefecture}
                        {el.Municipality && <span>{el.Municipality}</span>}
                        {el.DistrictName && <span>{el.DistrictName}</span>}
                    </p>
                    <HiddenDetailsContent aryEl={el} />
                </PagerArticleContents>
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

const PagerArticleContents = styled.article`
line-height: 2;
border-radius: 4px;
padding: 1em;
background-color: #eaeaee;
margin-bottom: 2.5em;

& .detailsViewBtn {
    cursor: pointer;
    appearance: none;
    border-radius: 4px;
    border: 1px solid transparent;
    background-color: #333;
    color: #fff;
    margin-top: 1em;
    padding: .25em 1em;

    &:hover {
        background-color: #fff;
        color: #333;
        border-color: #333;
    }
}

& .details{
    width: 100%;
    position: fixed;
    inset: 0;
    margin: auto;
    display: grid;
    padding: 5em calc(100vw/5);
    overflow-x: scroll;
    overflow: hidden;
    visibility: hidden;
    height: 0;
    background-color: rgba(255,255,255,.85);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);

    &.OnView{
        overflow: auto;
        visibility: visible;
        height: 100%;
        z-index: 1;
    }

    & .categories{
        display: none;
    }
}
`;