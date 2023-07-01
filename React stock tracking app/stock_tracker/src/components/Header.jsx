import React from "react";
import Search from "./Search";
import Themeicon from "./Themeicon";
import Login from "./LoginButton";
import SaveButton from "./SaveButton";
import SavedPageButton from "./SavedPageButton";
import { useState } from "react";

const Header = ({
  name,
  stockCallback,
  quoteCallback,
  stockToBeSaved,
  symbol,
  price,
  change,
  changePercent,
  currency,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [UID, setUID] = useState("");

  // callback functions to update login information from children components
  const updateLogin = async (state) => {
    setLoggedIn(state);
  };
  const updateUID = async (uid) => {
    setUID(uid);
  };

  return (
    <>
      <div className="x1:px-32">
        <div className="w-full h-full flex items-center justify-around">
          <h1 className="text-5xl">
            {name} ({symbol})
          </h1>
          <span className="relative left-5 text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
            ${price}
            <span className="text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2">
              {" "}
              {currency}
            </span>
          </span>
          <span
            className={`relative left-9 text-lg xl:text-2xl 2xl:text-3xl ${
              change > 0 ? "text-lime-500" : "text-red-500"
            }`}
          >
            {change} <span>({changePercent})%</span>
          </span>
        </div>
        <Search
          stockCallback={stockCallback}
          quoteCallback={quoteCallback}
          UID={UID}
        />
      </div>
      <SavedPageButton UID={UID} />
      <SaveButton
        isLoggedIn={loggedIn}
        stockToBeSaved={stockToBeSaved}
        UID={UID}
      />
      <Themeicon />
      <Login loginFunc={updateLogin} UIDFunc={updateUID} />
    </>
  );
};

export default Header;
