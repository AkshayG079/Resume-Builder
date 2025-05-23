import { createContext, useContext, useState } from "react";

const DataContext = createContext();

const ContextProvider = ({ children }) => {

    const [ResumeData, setResumeData] = useState([]);
    const [loggedUser, setLoggedUser] = useState('');

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return (
        <DataContext.Provider value={{ ResumeData, setResumeData, loggedUser, setLoggedUser,config }}>
            {children}
        </DataContext.Provider>
    )
}

export const DataState = () => {
    return useContext(DataContext)
}

export default ContextProvider