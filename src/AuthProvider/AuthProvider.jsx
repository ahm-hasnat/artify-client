import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

 const [user,setUser] = useState(null);
 
 const createUser = (email,password) =>{
    
    return createUserWithEmailAndPassword(auth,email,password);
}

const signIn = (email,password)=>{
    
    return signInWithEmailAndPassword(auth,email,password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

    const signout = () => {
    return signOut(auth);
  };

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
    });
    return () => {
      unsubscribe();
    };
  }, []);

    const AuthData = {
        user,
        createUser,
        setUser,
        signIn,
        signout,
        updateUser,
    };

    return <AuthContext value={AuthData}>{children}</AuthContext>;
};

export default AuthProvider;