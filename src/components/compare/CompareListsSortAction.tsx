import { memo, FC } from "react";
import styled from "styled-components";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'; // https://recharts.org/en-US

type CompareListsSortActionType = {
    isViewChart: boolean;
    setViewChart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompareListsSortAction: FC<CompareListsSortActionType> = memo((props) => {
    const { isViewChart, setViewChart } = props;

    // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];
    type dataType = {
        name: string,
        uv: number,
        pv?: number,
        amt?: number
    }
    const data: dataType[] = [];

    const sortAction = () => {
        const AverageCalcListsLiEls: NodeListOf<HTMLLIElement> | undefined = document.querySelectorAll('li'); // 計測結果リスト
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
                const averageTradePrice: number | undefined | null = Number(lists.querySelector('#averageTradePrice')?.textContent?.split(',').join(''));
                // console.log(annualYear, averageTradePrice);

                data.push({ name: '', uv: 0 }); // chart 表示用のオブジェクト配列に取得した年間データ分の{object 要素}を追加
                // console.log(data);

                /* 追加した{object 要素}に各年間データの内容を代入していく */
                if (annualYear && averageTradePrice !== (null || undefined)) {
                    data[i].name = annualYear;
                    data[i].uv = averageTradePrice;
                    console.log(data);
                }
            });
            setViewChart(true); // chart コンポーネントを表示
        }
    }

    const paragraphStyle: object = {
        'margin': '.5em 0',
        'fontSize': '14px'
    }

    return (
        <>
            <AverageCalcLists className="AverageCalcLists"></AverageCalcLists>
            <p style={paragraphStyle}>計測結果が随時追加されていきます。下記ボタンでソート表示できます。</p>
            <button type="button" onClick={sortAction}>sortAction</button>
            {isViewChart &&
                <LineChart width={600} height={300} data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
            }
        </>
    );
});

const AverageCalcLists = styled.ul`
list-style: none;
font-size: 14px;
line-height: 1.6;

& li {
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
`;