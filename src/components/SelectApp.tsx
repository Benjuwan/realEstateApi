import { memo, useState } from "react";
import styled from "styled-components";
import { SelectAppChange } from "./SelectAppChange";
import { SelectEls } from "./filter/SelectEls";
import { PagerBaseComponent } from "./pager/PagerBaseComponent";
import { FilterComponent } from "./filter/FilterComponent";
import { CompareComponent } from "./compare/CompareComponent";

export const SelectApp = memo(() => {
    /* 文字列の判定による機能の切替用 State */
    const [isAppChange, setAppChange] = useState<string>('mount');

    /* 初期表示を検知する State */
    const [isFirstSelect, setFirstSelect] = useState<boolean>(false);

    return (
        <SelectAppElm>
            {isAppChange === 'mount' ?
                <div className="appDescription">
                    <p>ここでは「日本各地の不動産取引データ」を確認できます。下記ドロップダウンリストから取得後の表示仕様・機能を選んでください。</p>
                    <SelectAppChange isAppChange={isAppChange} setAppChange={setAppChange} setFirstSelect={setFirstSelect} />
                    <ul className="explainFunctions">
                        <li>・<b>pager ver</b>：取得したデータを随時追加・削除する機能、またはページ送り機能が用意されています。</li>
                        <li>・<b>filter ver</b>：取引価格によるソート機能や市区町村内の特定地区の検索機能が用意されています（デフォルト）。</li>
                        <li>・<b>compare ver</b>：指定年数と場所に応じた不動産の年間取引平均価格を比較表示（リスト及びグラフ）する機能が用意されています。</li>
                    </ul>
                    <ul>
                        <li><b>【使い方（pager / filter ver 例）】</b></li>
                        <li>1:ドロップダウンリストから機能を選ぶとフォームが表示されます。（※下記フォームは使用例のダミーなのでデータ取得ボタンは表示されていません）</li>
                        <li>2:データの取得を希望する「都道府県」と「市区町村」、取引時期の計測開始期間と計測終了期間を選んでください。</li>
                        <li>3:フォーム下部に表示される「不動産取引データを取得」ボタンをクリックしてデータを取得します。</li>
                    </ul>
                    <SelectEls isCheckSelectValue="mount" />
                </div> :
                <div className="contentWidth">
                    <SelectAppChange isAppChange={isAppChange} setAppChange={setAppChange} isFirstSelect={isFirstSelect} />
                </div>
            }
            {isAppChange === 'pager' && <PagerBaseComponent />}
            {isAppChange === 'filter' && <FilterComponent />}
            {isAppChange === 'compare' && <CompareComponent />}
        </SelectAppElm>
    );
});

const SelectAppElm = styled.div`
padding: 0 2em;

& .appDescription {
    width: clamp(320px, 100%, 640px);
    margin: 0 auto 1em;
    padding: 2.5em;
    font-size: 14px;
    line-height: 1.8;
    color: #333;
    background-color: #f0f0f0;
    box-shadow: inset 0 0 8px rgba(0,0,0,.25);
    border-radius: 4px;

    & ul {
        list-style: none;
        padding: 0;
        margin-bottom: 1em;

        &.explainFunctions {
            margin-bottom: 3em;
        }

        & li {
            text-indent: -1em;
            padding-left: 1em;
        }

        & + div {
            margin: 0;
            & .termCaption{
                margin: 0;
            }
        }
    }
}

& .contentWidth{
    width: clamp(320px, 100%, 960px);
    margin: auto;
}
`;