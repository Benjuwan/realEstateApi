import { memo, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { FilterComponent } from "./filter/FilterComponent";
import { PagerBaseComponent } from "./pager/PagerBaseComponent";
import { SelectPrefs } from "./filter/SelectPrefs";

export const SelectApp = memo(() => {
    /*（処理落ち防止の）リロード判定用のState */
    const [isCheckSelectValue, setCheckSelectValue] = useState<boolean>(false);

    /* 文字列の判定による機能の切替用 State */
    const [isAppChange, setAppChange] = useState<string>('mount');
    const selectAppComponent = (AppChangeEl: ChangeEvent<HTMLSelectElement>) => {
        if (isCheckSelectValue) {
            location.reload();
        } else {
            const AppChangeValue: string = AppChangeEl.currentTarget.value;
            setAppChange((_prevAppChangeValue) => AppChangeValue);
            setCheckSelectValue(!isCheckSelectValue); // isCheckSelectValue を true に
        }
    }

    return (
        <SelectAppElm>
            {isAppChange === 'mount' &&
                <div className="appDescription">
                    <p>ここでは「日本各地の不動産取引データ」を確認できます。下記ドロップダウンリストから取得後の表示仕様・機能を選んでください。</p>
                    <select name="" id="AppChange" onChange={(AppChangeEl: ChangeEvent<HTMLSelectElement>) => {
                        selectAppComponent(AppChangeEl);
                    }}>
                        <option value="">ここから機能を選んでください</option>
                        <option value="pager">ページャー機能</option>
                        <option value="filter">フィルター機能</option>
                    </select>
                    <ul>
                        <li>・<b>ページャー ver</b>：取得したデータを随時追加・削除する機能、またはページ送り機能が用意されています。</li>
                        <li>・<b>フィルター ver</b>：取引価格によるソート機能や市区町村内の特定地区の検索機能が用意されています（デフォルト）。</li>
                    </ul>
                    <ul>
                        <li><b>【使い方】</b></li>
                        <li>1:ドロップダウンリストから機能を選ぶとフォームが表示されます。（※下記フォームは使用例のダミーなのでデータ取得ボタンは表示されていません）</li>
                        <li>2:データの取得を希望する「都道府県」と「市区町村」、取引時期の計測開始期間と計測終了期間を選んでください。</li>
                        <li>3:フォーム下部に表示される「不動産取引データを取得」ボタンをクリックしてデータを取得します。</li>
                    </ul>
                    <SelectPrefs isCheckSelectValue="mount" />
                </div>
            }
            {isAppChange === 'filter' && <FilterComponent />}
            {isAppChange === 'pager' && <PagerBaseComponent />}
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

& #AppChange {
    display: block;
    margin: 3em auto;
    font-size: 16px;
    line-height: 2;
}
`;