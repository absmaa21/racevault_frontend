import React, {createContext, useState, useEffect, ReactNode, FC} from 'react';

interface UserContextType {
    UserID: string | null;
    Login: (userID: string, remember?: boolean) => void;
    Logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({children}: any) => {
    const [UserID, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserId(storedUser);
        }
    }, []);

    const Login = (id: string, remember?: boolean) => {
        setUserId(id);
        if(remember) localStorage.setItem('user', id);
    };

    const Logout = () => {
        setUserId(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{UserID, Login, Logout}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};
