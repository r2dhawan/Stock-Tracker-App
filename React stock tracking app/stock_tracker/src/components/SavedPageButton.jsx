import React, { useContext } from "react";
import { DatabaseIcon } from "@heroicons/react/solid";
import ThemeContext from "../context/ThemeContext";
import { toast } from "react-toastify";
import { getDatabase, ref, child, get } from "firebase/database";
import { saveAs } from "file-saver";

const SavedPageButton = ({ UID }) => {
  const { darkMode } = useContext(ThemeContext);

  const handleClick = () => {
    if (UID === "") {
      toast.error("Log in to view your saved stocks");
    } else {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${UID}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const stockArray = snapshot.val().stock_arr;
            handleDownload(stockArray);
          } else {
            toast.error("No data available");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleDownload = (stockArray) => {
    console.log(stockArray);
    const textData = JSON.stringify(stockArray, null, 2);
    const blob = new Blob([textData], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "data.txt");
  };

  return (
    <button
      className={`rounded-lg border-1 border-neutral-400 p-2 
                      absolute right-32 xl:right-96 shadow-lg 
                      ${
                        darkMode ? "shadow-neutral-500" : null
                      } transition duration-300 hover:scale-125`}
      onClick={handleClick}
    >
      <DatabaseIcon
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

export default SavedPageButton;
