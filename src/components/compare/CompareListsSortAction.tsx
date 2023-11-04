import { memo } from "react";

export const CompareListsSortAction = memo(() => {
    const sortAction = () => {
        const AverageCalcListsLiEls: NodeListOf<HTMLLIElement> | undefined = document.querySelectorAll('li'); // 計測結果リスト
        if (typeof AverageCalcListsLiEls !== "undefined") {
            const sortListEls: HTMLLIElement[] = Array.from(AverageCalcListsLiEls).sort((ahead, behind) => {
                const aheadEl: number = Number(ahead.querySelector('span')?.textContent?.split('：')[0]);
                const behindEl: number = Number(behind.querySelector('span')?.textContent?.split('：')[0]);
                return behindEl - aheadEl; // 年数でソート（span内の文字列を加工して特定の文字列を取得）
            });

            const AverageCalcLists: HTMLUListElement | null = document.querySelector('.AverageCalcLists'); // 計測結果リストの親要素
            if (AverageCalcLists !== null) {
                AverageCalcLists.innerHTML = ""; // 親要素の中身をリセット
                sortListEls.forEach(sortListEl => {
                    AverageCalcLists.insertAdjacentElement('afterbegin', sortListEl); // ソートした内容をセット
                });
            }
        }
    }

    const paragraphStyle: object = {
        'margin': '.5em 0',
        'fontSize': '14px'
    }

    return (
        <>
            <ul className="AverageCalcLists"></ul>
            <p style={paragraphStyle}>計測結果が随時追加されていきます。下記ボタンでソート表示できます。</p>
            <button type="button" onClick={sortAction}>sortAction</button>
        </>
    );
});