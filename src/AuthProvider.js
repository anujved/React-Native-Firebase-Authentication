import React, {useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logInFn: (username, password) => {
          auth()
            .signInWithEmailAndPassword(username, password)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }

              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }

              console.error(error);
            });
        },
        registerFn: (username, password) => {
            auth()
            .createUserWithEmailAndPassword(username, password)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }
          
              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }
          
              console.error(error);
            });
        },
        logOut: ()=>{
            auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
};
