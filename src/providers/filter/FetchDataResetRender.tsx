/**
 * FetchDataContents.tsx にてコンテンツデータを初期取得及び表示している場合に使用
 * 使用想定例：訪問者にとりあえず見た目でどんなものかを知ってもらいたいケースなど
*/

import { createContext, ReactNode, useState, FC } from "react";

type Default = {
    isFetchDataResetRender: boolean;
    setFetchDataResetRender: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FetchDataResetRenderContext = createContext({} as Default);

type fragmentType = {
    children: ReactNode;
}
export const FetchDataResetRenderContextFragment: FC<fragmentType> = (props) => {
    const [isFetchDataResetRender, setFetchDataResetRender] = useState<boolean>(true);

    return (
        <FetchDataResetRenderContext.Provider value={{ isFetchDataResetRender, setFetchDataResetRender }}>
            {props.children}
        </FetchDataResetRenderContext.Provider>
    );
}