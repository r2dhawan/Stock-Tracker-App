import { searchSymbol, searchStock, searchQuote } from "../util/API";
import fetch from "jest-fetch-mock";

describe("API Tests", () => {
  it("should successfully call the API with searchSymbol and return a non-empty array", async () => {
    // only the non-emptiness of the object returned was tested since the result is unpredictable
    const query = "AAPL";

    const result = await searchSymbol(query);

    expect(JSON.stringify(result)).not.toBe("{}");
  });

  it("should return correct stock details when searched by symbol", async () => {
    const query = "AAPL";
    const expectedResponse = {
      country: "US",
      currency: "USD",
      estimateCurrency: "USD",
      exchange: "NASDAQ NMS - GLOBAL MARKET",
      finnhubIndustry: "Technology",
      ipo: "1980-12-12",
      logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.svg",
      name: "Apple Inc",
      phone: "14089961010.0",
      shareOutstanding: 15728.7,
      ticker: "AAPL",
      weburl: "https://www.apple.com/",
    };
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));

    const result = await searchStock(query);
    delete result.marketCapitalization; // delete market cap parameter since it can change over time

    expect(result).toEqual(expectedResponse);
  });

  it("should successfully call the API with searchQuote and return a non-empty array", async () => {
    // only the non-emptiness of the object returned was tested since the result is unpredictable
    const query = "AAPL";

    const result = await searchQuote(query);

    expect(JSON.stringify(result)).not.toBe("{}");
  });
});
