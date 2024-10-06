import { useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublis from "../Hooks/useAxiosPublis";

//1. creat context for providers and export it
export const AuthContext = createContext(null);

//6 [doc get start] Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  //4  user and losding
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  // 11 jwt setting
  const axiosPublic = useAxiosPublis();

  // 7. creat user
  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // 8 signin
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // 9 logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
  // 10 update user
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //6 user mennage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
      console.log("currentUser", currentUser);
      // 11 jwt setting
      if (currentUser) {
        // get token and store on site
        const userInfo = { email: currentUser.email };

        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        // no user
        // todo : remove token
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);
  // useing this depandency axiospulbic to log out if any error accourd

  // 3 send all contest
  const authInfo = {
    user,
    loading,
    creatUser,
    signIn,
    logout,
    updateUserProfile,
    googleSignin,
  };

  return (
    // 2 add this and pass childern props
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

//5 add auth provider in main file
export default AuthProvider;
