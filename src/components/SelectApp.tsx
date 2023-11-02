import { memo, useState, ChangeEvent } from "react";
import { FilterComponent } from "./filter/FilterComponent";
import { PagerBaseComponent } from "./pager/PagerBaseComponent";

export const SelectApp = memo(() => {
    /*（処理落ち防止の）リロード判定用のState */
    const [isCheckSelectValue, setCheckSelectValue] = useState<boolean>(false);

    /* 文字列の判定による機能の切替用 State */
    const [isAppChange, setAppChange] = useState<string>('');
    const selectAppComponent = (AppChangeEl: ChangeEvent<HTMLSelectElement>) => {
        if (isCheckSelectValue) {
            location.reload();
        } else {
            const AppChangeValue: string = AppChangeEl.currentTarget.value;
            setAppChange((_prevAppChangeValue) => AppChangeValue);

            setCheckSelectValue(!isCheckSelectValue);
        }
    }

    return (
        <>
            <select name="" id="AppChange" onChange={(AppChangeEl: ChangeEvent<HTMLSelectElement>) => {
                selectAppComponent(AppChangeEl);
            }}>
                <option value="">ここから機能を選んでください</option>
                <option value="pager">ページャー機能</option>
                <option value="filter">フィルター機能</option>
            </select>
            {isAppChange === 'filter' && <FilterComponent />}
            {isAppChange === 'pager' && <PagerBaseComponent />}
        </>
    );
});