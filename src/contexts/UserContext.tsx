import React, {createContext, useState, useEffect, ReactNode, FC} from 'react';
import {IUser} from "../pojos/interface";
import config from "../config";

interface UserContextType {
    user: IUser | null;
    login: (user: IUser, remember?: boolean) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({children}: any) => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser)
                fetch(config.backendUrl + `/user/${parsedUser.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(r => {
                        if (!r.ok) return
                        r.json().then(data => login(data, true))
                    })
            }
        } catch (e: any) {
            console.log('Error while getting localStorage')
            console.log('Deleting localStorage...')
            logout()
        }
    }, []);

    const login = (user: IUser, remember?: boolean) => {
        setUser(user);
        if (remember) localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};
