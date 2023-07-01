import React, { useEffect, useState, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import ThemeContext from "../context/ThemeContext";
import { auth, provider } from "../util/FirebaseConfig";
import {
  signInWithPopup,
  setPersistence,
  inMemoryPersistence,
  getAuth,
} from "firebase/auth";
import { toast } from "react-toastify";

const Login = ({ loginFunc, UIDFunc }) => {
  const { darkMode } = useContext(ThemeContext);
  const [value, setValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function: handleClick
  // Purpose: Handle the click event for the login button
  // Parameters: None
  // Returns: None
  const handleClick = () => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      setPersistence(auth, inMemoryPersistence)
        .then(() => {
          return signInWithPopup(auth, provider);
        })
        .then((data) => {
          const user = getAuth().currentUser;
          if (user) {
            setIsLoggedIn(true);
            console.log("User signed in successfully");
            loginFunc(isLoggedIn); // Pass isLoggedIn as true to the parent component
            UIDFunc(user.uid); // Pass UID to the parent component
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
            toast.success("Successfully logged in");
          } else {
            setIsLoggedIn(false);
            return;
          }
        })
        .catch((error) => {
          setIsLoggedIn(false);
          loginFunc(isLoggedIn);
          //console.log("Error signing in with popup:", error);
          //toast.error("Error signing in");
        });
    } else {
      toast.error("Already logged in");
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setValue(storedEmail);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <button
      className={`rounded-lg border-1 border-neutral-400 p-2 
                  absolute right-8 xl:right-12 shadow-lg 
                  ${
                    darkMode ? "shadow-neutral-500" : null
                  } transition duration-300 hover:scale-125`}
      onClick={handleClick}
    >
      <LockClosedIcon
        className={`h-8 w-8 cursor-pointer stroke-1 fill-none stroke-neutral-400
                    ${
                      darkMode
                        ? "fill-yellow-500 stroke-yellow-400"
                        : "fill-none stroke-neutral-400"
                    }`}
      />
    </button>
  );
};

export default Login;
