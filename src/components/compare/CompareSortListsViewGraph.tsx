import { memo, FC, useState, useContext } from "react";
import styled from "styled-components";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'; // https://recharts.org/en-US
import { CompareSortGraphAction } from "../../providers/compare/CompareSortGraphAction";

type CompareListsSortLists_viewGraphType = {
    isViewChart: boolean;
    setViewChart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompareSortListsViewGraph: FC<CompareListsSortLists_viewGraphType> = memo((props) => {
    const { isViewChart, setViewChart } = props;

    /* 各種 Context */
    const { isSortGraphAction } = useContext(CompareSortGraphAction);

    type chartDataType = {
        name: string,
        uv: number,
        pv?: number,
        amt?: number
    }
    const getChartDataSrc: chartDataType[] = []; // 取得した平均取引価格データを受け取る一次配列（getChartDataSrc の中身を反転させて isChartData へ反映させる）
    const [isChartData, setChartData] = useState<chartDataType[]>([]); // LineChart コンポーネントの data に渡すための State

    /* 取得した各年の平均取引価格のソート及びグラフ表示メソッド */
    const sortLists_viewGraph = () => {
        const AverageCalcListsLiEls: NodeListOf<HTMLLIElement> | undefined = document.querySelectorAll('.AverageCalcLists li'); // 計測結果リスト
        if (typeof AverageCalcListsLiEls !== "undefined") {
            const sortListEls: HTMLLIElement[] = Array.from(AverageCalcListsLiEls).sort((ahead, behind) => {
                const aheadEl: number = Number(ahead.querySelector('#annualYear')?.textContent);
                const behindEl: number = Number(behind.querySelector('#annualYear')?.textContent);
                return behindEl - aheadEl; // 年数でソート
            });

            const AverageCalcLists: HTMLUListElement | null = document.querySelector('.AverageCalcLists'); // 計測結果リストの親要素
            if (AverageCalcLists !== null) {
                AverageCalcLists.innerHTML = ""; // 親要素の中身をリセット
                sortListEls.forEach(sortListEl => {
                    AverageCalcLists.insertAdjacentElement('afterbegin', sortListEl); // ソートした内容をセット
                });
            }

            /* chart 表示 */
            sortListEls.forEach((lists, i) => {
                const annualYear: string | undefined | null = lists.querySelector('#annualYear')?.textContent;
                const averageTradePrice: number | undefined | null = Number(lists.querySelector('#averageTradePrice')?.textContent?.split(',').join('')); // 平均価格の文字列からカンマを取り除いて数値型に変換

                getChartDataSrc.push({ name: '', uv: 0 }); // chart 表示用のオブジェクト配列（一次配列）に取得した年間データ分の{object 要素}を追加

                /* 追加した{object 要素}に各年間データの内容を代入していく */
                if (annualYear && averageTradePrice !== (null || undefined)) {
                    getChartDataSrc[i].name = annualYear;
                    getChartDataSrc[i].uv = averageTradePrice;
                }
            });
            const Adjust_getChartDataSrc = getChartDataSrc.reverse(); // 一次配列の中身を反転
            setChartData((_prevChartData) => Adjust_getChartDataSrc); //（isChartData のリセット処理を記述していないため）処理ごとに倍数されるのでスプレッド構文（[...isChartData, ...getChartDataSrc]）は使用しない
            setViewChart(true); // chart コンポーネントを表示
        }
    }

    return (
        <SortListsViewGraphWrapper>
            <button type="button" className="sortLists_viewGraphBtn" disabled={isSortGraphAction} onClick={sortLists_viewGraph}>ソート&amp;グラフを表示</button>
            <p>計測結果は随時追加されていきます。指定した計測年数データが揃った後にソート&amp;グラフ表示してください。</p>
            {isViewChart &&
                <div className="LineChartWrapper">
                    <LineChart width={600} height={300} data={isChartData}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </LineChart>
                </div>
            }
            <ul className="AverageCalcLists"></ul>
        </SortListsViewGraphWrapper>
    );
});


const SortListsViewGraphWrapper = styled.div`
& .sortLists_viewGraphBtn {
    margin-bottom: .5em;

    & + p {
        font-size: 12px;
        margin-bottom: 1em;
    }
}

& .LineChartWrapper {
    overflow-x: scroll;
    padding: 1em;
    background-color: #f0f0f0;
    border-radius: 4px;

    @media screen and (min-width: 700px) {
        overflow-x: unset;
        font-size: 14px;

        & svg {
            overflow: unset;
        }
    }
}

& .AverageCalcLists {
    list-style: none;
    font-size: 1.4rem;
    line-height: 1.6;
    margin-bottom: 2.5em;
    padding-top: 1em;

    & li {
        &:not(:last-of-type){
            border-bottom: 1px solid #dadada;
            padding-bottom: .5em;
            margin-bottom: .5em;
        }

        & span {
            &#annualYear {
                font-weight: bold;

                &::after {
                    content: "：";
                }
            }

            &#averageTradePrice {
                &::before {
                    content: "￥";
                }
            }
        }
    }

    @media screen and (min-width: 1025px) {
        font-size: 14px;
    }
}
`;