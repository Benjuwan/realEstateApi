import { memo, useContext, FC, useState } from "react";
import styled from "styled-components";
import { GetFetchDataContext } from "../../providers/pager/GetFetchData";
import { PagerPages } from "./PagerPages";
import { PagerIncDec } from "./PagerIncDec";

type ContentsProps = {
    pagerLimitMaxNum: number;
}

export const Contents: FC<ContentsProps> = memo((props) => {
    const { pagerLimitMaxNum } = props;

    /* ページャー切替：A-ページ送り（true）、B-コンテンツデータの随時追加・削除（false）*/
    const [isPagerFrag, setPagerFrag] = useState<boolean>(true);

    /* 各種 Context */
    const { isPagers, isOffSet } = useContext(GetFetchDataContext);

    return (
        <>
            <p style={{ 'fontSize': '16px', 'textAlign': 'center', 'marginBottom': '1em' }}>{isPagers === 0 ? isPagers + isOffSet : isPagers}件 / {pagerLimitMaxNum}</p>
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