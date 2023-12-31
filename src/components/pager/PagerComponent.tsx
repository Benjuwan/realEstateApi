import { memo, useContext, useState, FC, useEffect } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { ChangePagerStyle } from "./ChangePagerStyle";
import { LoadingEl } from "../filter/LoadingEl";
import { ContentsNumber } from "./ContentsNumber";
import { Pagination } from "./Pagination";
import { PagerPages } from "./PagerPages";
import { PagerIncDec } from "./PagerIncDec";

type PagerComponentProps = {
    pagerLimitMaxNum: number;
}

export const PagerComponent: FC<PagerComponentProps> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    /* 各種Context */
    const { isGetFetchData, isPagers, isLoading } = useContext(GetFetchDataContext);

    /* ページャー機能（PagerPages.tsx / PagerIncDec.tsx）の切替用Bool */
    const [isPagerFrag, setPagerFrag] = useState<boolean>(true);

    useEffect(() => {
        /* レンダリング時にスクロールトップ */
        if (isPagerFrag) window.scrollTo(0, 0);
    }, [isPagers]); // 依存配列 isPagers：ページャー数が変更される度

    return (
        <>
            {isLoading ? <LoadingEl /> :
                <>
                    {isGetFetchData.length > 0 &&
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
                    }
                </>
            }
        </>
    );
});

const ContentWrapper = styled.div`
/* padding: 0 2em; */
font-size: 1.4rem;

& article {
    border-radius: 4px;
    padding: 1em;
    background-color: #eaeaee;
    margin-bottom: 2.5em;
    
    & .boxes{
        margin-bottom: 1em;
    }

    & .categories{
        display: flex;
        align-items: center;
        gap: 2%;
        line-height: 1.4;
        color: #fff;
        
        & h2,
        & p{
            font-weight: normal;
            margin: 0;
            padding: .25em 1em;
            border-radius: 30px;
            background-color: #333;
            text-align: center;
        }

        & p{
            background-color: #333;
        }
    }

    & .infos,
    & .otherInfo{
        line-height: 1.6;
        
        & p{
            margin: 0;
            border-left: 5px solid #333;
            padding-left: .5em;

            &:not(:last-of-type){
                margin-bottom: 1em;
            }
        }
    }

    @media screen and (min-width: 700px) {
        width: 49%;
        & .categories{
            width: 100%;
            margin-bottom: 1em;
        }
    }

    @media screen and (min-width: 1025px) {
        width: 32%;
    }
}

@media screen and (min-width: 700px) {
    display: flex;
    flex-flow: row wrap;
    gap: 2%;
}

@media screen and (min-width: 1025px) {
    font-size: 14px;
}
`;