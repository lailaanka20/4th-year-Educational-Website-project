import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,

  authDomain: "edusite-12286.firebaseapp.com",

  projectId: "edusite-12286",

  storageBucket: "edusite-12286.appspot.com",

  messagingSenderId: "227991541301",

  appId: "1:227991541301:web:bae993508a19c99e00837c",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
