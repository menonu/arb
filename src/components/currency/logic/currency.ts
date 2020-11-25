import cctx, { binance } from "ccxt";

interface Price {
  exchange: string;
  low: number;
  high: number;
  vol: number;
}

const GetBtcPrices = (): Array<Price> => {
  const xa: Array<Price> = [
    { exchange: "Binance", low: 10, high: 20, vol: 1000 },
    { exchange: "Huobi", low: 1, high: 30, vol: 1500 },
  ];

  return xa;
};

export { GetBtcPrices };
