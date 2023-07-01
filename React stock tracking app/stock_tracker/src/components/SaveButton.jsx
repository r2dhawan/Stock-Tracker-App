import React, { useContext } from "react";
import { BookmarkIcon } from "@heroicons/react/solid";
import ThemeContext from "../context/ThemeContext";
import { toast } from "react-toastify";
import { getDatabase, ref, set, get } from "firebase/database";

const SaveButton = ({ isLoggedIn, stockToBeSaved, UID }) => {
  const { darkMode } = useContext(ThemeContext);

  // Function: writeUserData
  // Purpose: Write the stock data to the database
  // Parameters: userId, stock
  // Returns: None
  async function writeUserData(userId, stock) {
    const db = getDatabase();
    const stockObj = { stock };
    const userRef = ref(db, "users/" + userId);

    try {
      // Retrieve the current data from the database
      const snapshot = await get(userRef);
      const currentData = snapshot.val() || {}; // If no data exists, initialize as an empty object

      // Check if stock_arr already exists
      const stockArray = currentData.stock_arr ? currentData.stock_arr : [];

      const stockSaved = stockArray.some(
        (item) => item.stock.ticker === stock.ticker
      );

      // Append the new stock object to the stock array
      if (!stockSaved) {
        toast.success("Stock saved");
        stockArray.push(stockObj);
      } else {
        toast.error("Stock already saved");
      }

      // Set the updated stock array back to the database and wait for it to complete
      await set(userRef, {
        stock_arr: stockArray,
      });
    } catch (error) {
      console.log("Error appending data:", error);
    }
  }

  // Function: handleClick
  // Purpose: Handle the click event for the save button
  // Parameters: None
  // Returns: None
  const handleClick = () => {
    console.log(isLoggedIn);
    if (UID === "") {
      toast.error("Please login to save stocks");
      return;
    } else {
      // TODO: Save the stock to the database
      if (stockToBeSaved.length === 0) {
        toast.error("Please choose a valid stock");
      } else {
        console.log(stockToBeSaved);
        writeUserData(UID, stockToBeSaved);
      }
    }
  };

  return (
    <>
      <h1 className="ml-5 mt-12">Logged in as: {UID}</h1>
      <button
        className={`rounded-lg border-1 border-neutral-400 p-2 
                  absolute right-64 xl:right-64 shadow-lg 
                  ${
                    darkMode ? "shadow-neutral-500" : null
                  } transition duration-300 hover:scale-125`}
        onClick={handleClick}
      >
        <BookmarkIcon
          className={`h-8 w-8 cursor-pointer stroke-1 fill-none stroke-neutral-400
                    ${
                      darkMode
                        ? "fill-yellow-500 stroke-yellow-400"
                        : "fill-none stroke-neutral-400"
                    }`}
        />
      </button>
    </>
  );
};

export default SaveButton;
