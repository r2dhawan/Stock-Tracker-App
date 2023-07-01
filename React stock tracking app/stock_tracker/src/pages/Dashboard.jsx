import React from "react";
import { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Details from "../components/Details";
import Chart from "../components/Chart";
import Search from "../components/Search";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { searchQuote, searchStock } from "../util/API";
import Timer from "../components/Timer";
import IsMarketOpen from "../components/Timer";
const Dashboard = () => {
  //use state for all important variables
  const [stock, setStock] = useState({});
  const [quote, setQuote] = useState({});

  const { darkMode } = useContext(ThemeContext);

  const { stockSymbol } = useContext(StockContext);

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await searchStock(stockSymbol);
        setStock(result);
      } catch (error) {
        setStock({});
        console.log(error);
      }
    };
    const updateStockOverview = async () => {
      try {
        const result = await searchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };
    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

  // callback functions to update stocks from children components
  const updateStock = async (stock) => {
    setStock(stock);
  };
  const updateQuote = async (stock) => {
    setQuote(stock);
  };

  IsMarketOpen();

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-ubuntu ${
        darkMode ? "bg-neutral-900 text-neutral-300" : "bg-neutral-100"
      }`}
    >
      <div className="col-span-1 md:col-span-2 xl-col-span-3 row-span-1 flex justify-start items-center">
        <Header
          name={stock.name}
          stockCallback={updateStock}
          quoteCallback={updateQuote}
          stockToBeSaved={stock}
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stock.currency}
        />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart stockTicker={stock.ticker} />
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stock} />
      </div>
    </div>
  );
};

export default Dashboard;
