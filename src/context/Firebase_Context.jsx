import { useContext, createContext, useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
  getFirestore,
  collection,
  deleteDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import app from "../components/Firebase";
import { useNavigate } from "react-router-dom";

const firebase = createContext();

const Firebase_provider = ({ children }) => {
  const Auth = getAuth(app);
  const realtime_db = getDatabase(app);
  const firestore_db = getFirestore(app);

  const sign_in = (email, password) => {
    signInWithEmailAndPassword(Auth, email, password);
  };

  const update_profile = (name) => {
    updateProfile(Auth.currentUser, { displayName: name, role: "user" });
  };

  const sign_up = (email, password, setuser, seterr) => {
    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        // Signed up
        setuser(userCredential.user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterr(errorMessage);
        // ..
      });
  };

  const sign_out = () => {
    signOut(Auth);
  };

  const make_list = async (path, name, data) => {
    try {
      const group_ref = collection(firestore_db, path);
      await setDoc(doc(group_ref, name), { data });
    } catch (err) {
      console.log(err);
    }
  };

  const get_doc = async (path, name, set) => {
    try {
      const docref = doc(firestore_db, path, name);
      const docsnap = await getDoc(docref);
      if (docsnap.exists()) {
        const result = docsnap.data();
        set(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getMultipleDocs = async (path, set) => {
    try {
      const collectionRef = collection(firestore_db, path);
      const querySnapshot = await getDocs(collectionRef);

      const documents = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          documents.push(doc.data());
        }
      });

      set(documents);
    } catch (err) {
      console.error("حدث خطأ في الحصول على الوثائق:", err);
    }
  };

  const delete_doc = async (path, name) => {
    try {
      await deleteDoc(doc(firestore_db, path, name));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <firebase.Provider
      value={{
        sign_in,
        sign_up,
        update_profile,

        sign_out,
        getMultipleDocs,
        make_list,
        get_doc,
        delete_doc,
        Auth,
        firestore_db,
      }}
    >
      {children}
    </firebase.Provider>
  );
};

export default Firebase_provider;

export const useFirebase_context = () => {
  return useContext(firebase);
};
