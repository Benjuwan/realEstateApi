import { createContext, ReactNode, useState, FC } from "react";

type contextType = {
    isCityName: string;
    setCityName: React.Dispatch<React.SetStateAction<string>>;
}
export const CityName = createContext({} as contextType);

type fragmentType = {
    children: ReactNode;
}
export const CityNameFragment: FC<fragmentType> = (props) => {
    const [isCityName, setCityName] = useState<string>('');

    return (
        <CityName.Provider value={{ isCityName, setCityName }}>
            {props.children}
        </CityName.Provider>
    );
}