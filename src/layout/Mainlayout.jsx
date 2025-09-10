import { React, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import NavBarUser from "../components/NavBarUser";
import Footer from "../components/Footer";

const Navlayout = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe;
  }, []);
  return (
    <>
      {user ? <NavBarUser /> : <NavBar />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Navlayout;
