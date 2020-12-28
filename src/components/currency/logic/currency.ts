import ccxt, { Exchange, Ticker } from "ccxt";
import _ from "lodash";

const InitCCXT = () => {
  const proxyurl = process.env.VUE_APP_CORSPROXY || "";
  const binance = new ccxt.binance();
  const bitbank = new ccxt.bitbank();
  const ftx = new ccxt.ftx({
    proxy: proxyurl,
  });
  const zaif = new ccxt.zaif({
    proxy: proxyurl,
  });
  const huobijp = new ccxt.huobijp({
    proxy: proxyurl,
  });
  const okex = new ccxt.okex({
    proxy: proxyurl,
  });
  const kucoin = new ccxt.kucoin({
    proxy: proxyurl,
  });
  const exchanges: { [s: string]: Exchange } = {
    binance,
    bitbank,
    ftx,
    zaif,
    huobijp,
    okex,
    kucoin,
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
    FTX: ex.ftx.fetch_ticker("ETH/USD"),
    Bitbank: ex.bitbank.fetch_ticker("ETH/JPY"),
    zaif: ex.zaif.fetch_ticker("ETH/JPY"),
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
    BinanceBTC: ex.binance.fetch_ticker("XRP/BTC"),
    Bitbank: ex.bitbank.fetch_ticker("XRP/JPY"),
    FTXBTC: ex.ftx.fetch_ticker("XRP/BTC"),
    FTX: ex.ftx.fetch_ticker("XRP/USD"),
    huobijp: ex.huobijp.fetch_ticker("XRP/BTC"),
  };

  const results = _.zip(_.keys(prices), await Promise.all(_.values(prices)));
  const xav = results.map(
    (v): Price => ({ exchange: v[0] ? v[0] : "None", ...ExtractTicker(v[1]) })
  );
  return xav;
};

const GetXemPrices = async (): Promise<Array<Price>> => {
  const prices = {
    BinanceBTC: ex.binance.fetch_ticker("XEM/BTC"),
    Binance: ex.binance.fetch_ticker("XEM/USDT"),
    zaif: ex.zaif.fetch_ticker("XEM/BTC"),
    zaifjpy: ex.zaif.fetch_ticker("XEM/JPY"),
    huobijp: ex.huobijp.fetch_ticker("XEM/BTC"),
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
    FTX: ex.ftx.fetch_ticker("BCH/USD"),
    zaif: ex.zaif.fetch_ticker("BCH/JPY"),
    Bitbank: ex.bitbank.fetch_ticker("BCH/JPY"),
    huobijp: ex.huobijp.fetch_ticker("BCH/BTC"),
  };

  const results = _.zip(_.keys(prices), await Promise.all(_.values(prices)));
  const xav = results.map(
    (v): Price => ({ exchange: v[0] ? v[0] : "None", ...ExtractTicker(v[1]) })
  );
  return xav;
};

const GetBTCJPYPrice = async (): Promise<number> => {
  const btcjpy = await ex.bitbank.fetch_ticker("BTC/JPY");
  return btcjpy.bid;
};

const GetBTCUSDPrice = async (): Promise<number> => {
  const btcusd = await ex.binance.fetch_ticker("BTC/USDT");
  return btcusd.bid;
};

export const GetETHJPYPrice = async (): Promise<number> => {
  const ethjpy = await ex.bitbank.fetch_ticker("ETH/JPY");
  return ethjpy.bid;
};

export const GetETHUSDPrice = async (): Promise<number> => {
  const ethusd = await ex.binance.fetch_ticker("ETH/USDT");
  return ethusd.bid;
};

const GetXlmPrices = async (): Promise<Array<Price>> => {
  const prices = {
    Binance: ex.binance.fetch_ticker("XLM/BTC"),
    huobijp: ex.huobijp.fetch_ticker("XLM/BTC"),
    Bitbank: ex.bitbank.fetch_ticker("XLM/JPY"),
  };

  const results = _.zip(_.keys(prices), await Promise.all(_.values(prices)));
  const xav = results.map(
    (v): Price => ({ exchange: v[0] ? v[0] : "None", ...ExtractTicker(v[1]) })
  );
  return xav;
};

const GetLtcPrices = async (): Promise<Array<Price>> => {
  const prices = {
    Binance: ex.binance.fetch_ticker("LTC/BTC"),
    huobijp: ex.huobijp.fetch_ticker("LTC/BTC"),
    Bitbank: ex.bitbank.fetch_ticker("LTC/BTC"),
    Bitbankj: ex.bitbank.fetch_ticker("LTC/JPY"),
  };

  const results = _.zip(_.keys(prices), await Promise.all(_.values(prices)));
  const xav = results.map(
    (v): Price => ({ exchange: v[0] ? v[0] : "None", ...ExtractTicker(v[1]) })
  );
  return xav;
};

export {
  GetBtcPrices,
  GetEthPrices,
  GetXrpPrices,
  GetXemPrices,
  GetBchPrices,
  GetBTCJPYPrice,
  GetBTCUSDPrice,
  GetXlmPrices,
  GetLtcPrices,
};
