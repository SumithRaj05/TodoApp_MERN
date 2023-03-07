import React,{useState} from 'react';

export const AuthContext = React.createContext({
    IsLoggedIn: false,
    LogIn: () => {},
    LogOut: () => {},
    user: ''
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [User, setUser] = useState('');
    const [Username, setUsername] = useState('');
    
    const LoginHandler = (user, username) => {
        setIsLoggedIn(true);
        setUser(user);
        setUsername(username);
    }
    const LogoutHandler = () => {
        setIsLoggedIn(false);
    }

    return <AuthContext.Provider  
                value={{IsLoggedIn : isLoggedIn,
                        LogOut : LogoutHandler,
                        LogIn : LoginHandler,
                        user: User,
                        username: Username
                    }}>
        {props.children}
    </AuthContext.Provider>
}