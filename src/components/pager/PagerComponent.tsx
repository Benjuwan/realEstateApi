import { memo, useContext, FC, useEffect, useCallback } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { ContentsNumber } from "./ContentsNumber";
import { PagerPages } from "./PagerPages";
import { PagerIncDec } from "./PagerIncDec";
import { useGetJsonData } from "../../hooks/pager/useGetJsonData";

type PagerComponentProps = {
    pagerLimitMaxNum: number;
    isPagerFrag: boolean;
    setPagerFrag: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PagerComponent: FC<PagerComponentProps> = memo((props) => {
    const { pagerLimitMaxNum, isPagerFrag, setPagerFrag } = props;

    const { isPagers, setPagers } = useContext(GetFetchDataContext);

    /**
     * ページャー切替：デフォルト true
     * true：ページ送り
     * false：コンテンツデータの随時追加・削除
    */
    const changePagerMethod = useCallback(() => {
        setPagerFrag(!isPagerFrag);
        setPagers((_prevPagerNum) => 0); // 切替時にページャーをリセット
    }, [isPagerFrag]);
    const changePagerMethodStyle: object = {
        'appearance': 'none',
        'display': 'block',
        'width': 'clamp(160px, 100%, 320px)',
        'margin': '0 auto .5em',
        'border': '1px solid',
        'borderRadius': '4px'
    }

    /* fetch API（親コンポーネントで読み込まないと State 更新などによる再レンダリングで随時読み込まれてしまう= jsonデータが倍数で増えていく）*/
    const { GetJsonData } = useGetJsonData();
    useEffect(() => {
        GetJsonData('https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205');

        /* レンダリング時にスクロールトップ */
        if (isPagerFrag) {
            window.scrollTo(0, 0);
        }
    }, [isPagers]); // 依存配列 isPagers：ページャー数が変更される度

    return (
        <>
            <div>
                <button style={changePagerMethodStyle} id="changePagerMethod" type="button" onClick={changePagerMethod}>{isPagerFrag ? 'ページ送りver' : 'コンテンツ追加・削除ver'}</button>
                <ContentsNumber pagerLimitMaxNum={pagerLimitMaxNum} isPagerFrag={isPagerFrag} />
            </div>
            <ContentWrapper>
                {isPagerFrag ?
                    <PagerPages pagerLimitMaxNum={pagerLimitMaxNum} /> :
                    <PagerIncDec pagerLimitMaxNum={pagerLimitMaxNum} />
                }
            </ContentWrapper>
        </>
    );
});

const ContentWrapper = styled.div`
width: clamp(320px, 100%, 640px);
margin: auto;
padding: 0 2em;
font-size: 1.6rem;

& article {
    border-radius: 4px;
    padding: 1em;
    background-color: #eaeaee;
    margin-bottom: 4em;

    & .boxes{
        margin-bottom: 1em;
    }

    & .categories{
        display: flex;
        align-items: center;
        gap: 2%;
        line-height: 2;
        color: #fff;
        
        & h2,
        & p{
            margin: 0;
            font-size: 14px;
            padding: .25em 1em;
            border-radius: 30px;
            background-color: limegreen;
            text-align: center;
        }

        & p{
            background-color: #333;
        }
    }

    & .infos,
    & .otherInfo{
        line-height: 1.8;
        font-size: 16px;
        
        & p{
            margin: 0;
            border-left: 5px solid #333;
            padding-left: .5em;

            &:not(:last-of-type){
                margin-bottom: 1em;
            }

            & span{
                margin: 0 .5em;
            }
        }
    }

    & .infos{
        border-bottom: 1px solid #333;
        padding-bottom: 1em;
    }
    & .otherInfo{
        margin: 0;
    }

    @media screen and (min-width: 700px) {
        display: flex;
        flex-flow: row wrap;
        gap: 2%;
        width: 48%;

        & .boxes{
            width: 48%;
        }

        & .categories{
            width: 100%;
            margin-bottom: 1em;
        }

        & .infos{
            border-bottom: none;
            padding: 0;
        }
    }

    @media screen and (min-width: 1025px) {
        width: 32%;
    }
}

@media screen and (min-width: 700px) {
    width: clamp(320px, 100%, 960px);
    display: flex;
    flex-flow: row wrap;
    gap: 2%;
    justify-content: space-between;
}

@media screen and (min-width: 1025px) {
    width: clamp(320px, 100%, 1280px);
    font-size: 16px;
}
`;