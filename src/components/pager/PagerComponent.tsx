import { memo, useContext, useState, FC, useEffect } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { ChangePagerStyle } from "./ChangePagerStyle";
import { ContentsNumber } from "./ContentsNumber";
import { Pagination } from "./Pagination";
import { PagerPages } from "./PagerPages";
import { PagerIncDec } from "./PagerIncDec";
import { useGetJsonData } from "../../hooks/pager/useGetJsonData";

type PagerComponentProps = {
    pagerLimitMaxNum: number;
}

export const PagerComponent: FC<PagerComponentProps> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    /* 各種Context */
    const { isPagers } = useContext(GetFetchDataContext);

    /* ページャー機能（PagerPages.tsx / PagerIncDec.tsx）の切替用Bool */
    const [isPagerFrag, setPagerFrag] = useState<boolean>(true);

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
                <ChangePagerStyle isPagerFrag={isPagerFrag} setPagerFrag={setPagerFrag} />
                <ContentsNumber
                    pagerLimitMaxNum={pagerLimitMaxNum}
                    isPagerFrag={isPagerFrag}
                />
            </div>
            <ContentWrapper>
                <Pagination pagerLimitMaxNum={pagerLimitMaxNum} isPagerFrag={isPagerFrag} />
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
        gap: 4%;
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