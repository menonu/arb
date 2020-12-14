import ccxt, { Exchange, Ticker } from "ccxt";
import _ from "lodash";

const InitCCXT = () => {
  const binance = new ccxt.binance();
  const bitbank = new ccxt.bitbank();
  const ftx = new ccxt.ftx({
    proxy: "http://localhost:8090/",
  });
  const zaif = new ccxt.zaif({
    proxy: "http://localhost:8090/",
  });
  // const exchanges: any = {
  const exchanges: { [s: string]: Exchange } = {
    binance,
    bitbank,
    ftx,
    zaif,
  };
  return exchanges;
};

const ex = InitCCXT();

export interface Price {
  exchange: string;
  bid: number;
  ask: number;
  vol: number;
  symbol: string;
}

const ExtractTicker = (ticker: Ticker) => {
  return {
    bid: ticker.bid,
    ask: ticker.ask,
    vol: 0,
    symbol: ticker.symbol,
  };
};

const GetBtcPrices = async (): Promise<Array<Price>> => {
  const prices = {
    Binance: ex.binance.fetch_ticker("BTC/USDT"),
    Bitbank: ex.bitbank.fetch_ticker("BTC/JPY"),
    FTX: ex.ftx.fetch_ticker("BTC/USD"),
    ZAIF: ex.zaif.fetch_ticker("BTC/JPY"),
  };

  const results = _.zip(_.keys(prices), await Promise.all(_.values(prices)));
  const xav = results.map(
    (v): Price => ({ exchange: v[0] ? v[0] : "None", ...ExtractTicker(v[1]) })
  );
  return xav;
};

const GetEthPrices = async (): Promise<Array<Price>> => {
  const prices = {
    Binance: ex.binance.fetch_ticker("ETH/USDT"),
    Bitbank: ex.bitbank.fetch_ticker("ETH/JPY"),
    FTX: ex.ftx.fetch_ticker("ETH/USD"),
  };

  const results = _.zip(_.keys(prices), await Promise.all(_.values(prices)));
  const xav = results.map(
    (v): Price => ({ exchange: v[0] ? v[0] : "None", ...ExtractTicker(v[1]) })
  );
  return xav;
};

const GetXrpPrices = async (): Promise<Array<Price>> => {
  const prices = {
    Binance: ex.binance.fetch_ticker("XRP/USDT"),
    Bitbank: ex.bitbank.fetch_ticker("XRP/JPY"),
    FTX: ex.ftx.fetch_ticker("XRP/USD"),
  };

  const results = _.zip(_.keys(prices), await Promise.all(_.values(prices)));
  const xav = results.map(
    (v): Price => ({ exchange: v[0] ? v[0] : "None", ...ExtractTicker(v[1]) })
  );
  return xav;
};

const GetXemPrices = async (): Promise<Array<Price>> => {
  const prices = {
    Binance: ex.binance.fetch_ticker("XEM/BTC"),
    zaif: ex.zaif.fetch_ticker("XEM/BTC"),
  };

  const results = _.zip(_.keys(prices), await Promise.all(_.values(prices)));
  const xav = results.map(
    (v): Price => ({ exchange: v[0] ? v[0] : "None", ...ExtractTicker(v[1]) })
  );
  return xav;
};

const GetBchPrices = async (): Promise<Array<Price>> => {
  const prices = {
    Binance: ex.binance.fetch_ticker("BCH/USDT"),
    zaif: ex.zaif.fetch_ticker("BCH/JPY"),
  };

  const results = _.zip(_.keys(prices), await Promise.all(_.values(prices)));
  const xav = results.map(
    (v): Price => ({ exchange: v[0] ? v[0] : "None", ...ExtractTicker(v[1]) })
  );
  return xav;
};

export { GetBtcPrices, GetEthPrices, GetXrpPrices, GetXemPrices, GetBchPrices };
