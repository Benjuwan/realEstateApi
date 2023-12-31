import { memo, FC, useCallback, useContext } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

type ChangePagerStyle = {
    isPagerFrag: boolean;
    setPagerFrag: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChangePagerStyle: FC<ChangePagerStyle> = memo(({ isPagerFrag, setPagerFrag }) => {
    /* 各種Context */
    const { setPagers, setCurrPager } = useContext(GetFetchDataContext);

    /**
     * ページャー切替（PagerComponent.tsx に State：デフォルト true ）
     * true：ページ送り
     * false：コンテンツデータの随時追加・削除
    */
    const changePagerMethod: () => void = useCallback(() => {
        setPagerFrag(!isPagerFrag);
        setPagers((_prevPagerNum) => 0); // 切替時にページャーをリセット
        setCurrPager((_prevCurrPager) => 1); // 切替時に表示ページ番号をリセット
    }, [isPagerFrag]);

    const changePagerMethodStyle: object = {
        'appearance': 'none',
        'display': 'block',
        'cursor': 'pointer',
        'width': 'clamp(160px, 100%, 320px)',
        'margin': '0 auto .5em',
        'border': '1px solid',
        'borderRadius': '4px',
        'padding': '.5em 1em',
        'lineHeight': '2',
        'backgroundColor': '#333',
        'color': '#fff',
        'letterSpacing': '.25em'
    }

    return <button type="button" style={changePagerMethodStyle} onClick={changePagerMethod}>{isPagerFrag ? 'ページ送りver' : 'コンテンツ随時追加・削除ver'}</button>
});