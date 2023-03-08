import React,{useState, useEffect} from 'react';

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
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedUsername = localStorage.getItem('username');
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    
        if (storedUser && storedUsername && storedIsLoggedIn) {
          setUser(storedUser);
          setUsername(storedUsername);
          setIsLoggedIn(storedIsLoggedIn === true);
        }
      }, []);

    const LoginHandler = (user, username) => {
        setIsLoggedIn(true);
        setUser(user);
        setUsername(username);

        localStorage.setItem('user', user);
        localStorage.setItem('username', username);
        localStorage.setItem('isLoggedIn', true);
    }
    const LogoutHandler = () => {
        setIsLoggedIn(false);
        setUser('');
        setUsername('');

        localStorage.removeItem('user');
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedIn');
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