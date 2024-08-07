import React, { createContext, useContext, useState } from "react";

const context = createContext(true);

export const useSideBar = () => {
    return useContext(context)
}

const ContextProvider = ({ children }) => {
    const [isSidebarOn, setIsSidebarOn] = useState(true)
    const [category, setCategory] = useState(0);
    return (
        <context.Provider value={{ category, setCategory, isSidebarOn, setIsSidebarOn }}>
            {children}
        </context.Provider>
    )
}

export default ContextProvider