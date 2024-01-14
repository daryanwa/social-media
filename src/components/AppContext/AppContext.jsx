import { GoogleAuthProvider, signOut } from 'firebase/auth'
import React, { createContext, useState, useEffect } from 'react'
import { signInWithPopup, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {auth, db, onAuthStateChanged} from '../firebase/firebase'
import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext()



function AppContext({children}) {

    
    const collectinUserRef = collection(db, 'users')
    const provider = new GoogleAuthProvider()
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const navigate = useNavigate()
    const signInWithGoogle = async () => {
        try{
        const popup = await signInWithPopup(auth, provider)
        const user = popup.user
        const q = query(collectinUserRef, where('uid', '==', user.uid))
        const docs = await getDocs(q)
        if(docs.docs.length === 0){
            await addDoc(collectinUserRef, {
                uid: user?.uid,
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                authProvider: popup?.providerId
            })
        }
        }catch(err){
            alert(err.message)
            console.log(err.message)
        }
    }

    const loginWithEmailAndPassword = async({name, email, password}) => {
        try{
            const res = await signInWithEmailAndPassword(auth, email, password)
            const user = res.user
            await addDoc(collectinUserRef, {
                uid: user.uid,
                name,
                
                providerId: 'email/password',
                email: user.email
            })
          
        }catch(err){
            console.error('Firebase login error:', err.code, err.message);
        
        }
    }


    const sighOutUser = async() => {
        await signOut(auth)
    }


    const userStateChanged = async() => {
        onAuthStateChanged(auth, async(user)=> {
            if(user){
                const q = query(collectinUserRef, where('uid', '==', user?.uid))
                await onSnapshot(q,(doc) => {
                    setUserData(doc?.docs[0]?.data())
                })
                setUser(user)
            }else{
                setUser(null)
                navigate('/login')
            }
        })
    }

    useEffect(()=> {
        userStateChanged()
        if(user || userData){
            navigate('/')
        }else{
            navigate('/login')
        }
        return () => userStateChanged()
    },[])


    let initState = {
        signInWithGoogle: signInWithGoogle,
        loginWithEmailAndPassword: loginWithEmailAndPassword,
        signOutUser: sighOutUser,
        user: user,
        userData: userData
    }


    
    console.log('userData', userData)
    


  return (
    <div>
        <AuthContext.Provider value={initState}>
            {children}
        </AuthContext.Provider>
    </div>
  )
}

export default AppContext