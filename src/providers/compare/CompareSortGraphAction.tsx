import { createContext, ReactNode, useState, FC } from "react";

type Default = {
    isSortGraphAction: boolean;
    setSortGraphAction: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CompareSortGraphAction = createContext({} as Default);

type fragmentType = {
    children: ReactNode;
}
export const CompareSortGraphActionFragment: FC<fragmentType> = ({ children }) => {
    const [isSortGraphAction, setSortGraphAction] = useState<boolean>(true);

    return (
        <CompareSortGraphAction.Provider value={{
            isSortGraphAction, setSortGraphAction
        }}>
            {children}
        </CompareSortGraphAction.Provider>
    );
}