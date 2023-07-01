const basePath = "https://finnhub.io/api/v1";
const APIKey = "ci8ct81r01qnrgm35310ci8ct81r01qnrgm3531g";

export const searchSymbol = async (query) => {
  const url = `${basePath}/search?q=${query}&token=${APIKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const searchStock = async (query) => {
  const url = `${basePath}/stock/profile2?symbol=${query}&token=${APIKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const searchQuote = async (query) => {
  const url = `${basePath}/quote?symbol=${query}&token=${APIKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const getHistoricalData = async (stockSymbol, resolution, from, to) => {
  const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${APIKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
