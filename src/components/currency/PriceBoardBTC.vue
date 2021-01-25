<template>
  <div>
    <price-header></price-header>
    <price-card
      v-for="price in usdprices"
      :key="price.exchange"
      :prices="price"
      :digits="digits"
    ></price-card>

    DiffBidBid: {{ Diffbidbid.ratio }} <br />
    DiffBidAsk: {{ Diffbidask.ratio }} <br />
    JPYUSD is {{ jpyusd }} <br />
    BTCJPY is {{ btcjpy }} <br />
    BTCUSD is {{ btcusd }} <br />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PriceCard, { RefinedPrice } from "./PriceCard.vue";
import PriceHeader from "./PriceHeader.vue";
import { Price, GetBTCJPYPrice, GetBTCUSDPrice } from "./logic/currency";

type Data = {
  prices: Array<Price>;
  jpyusd: number;
  btcjpy: number;
  btcusd: number;
};

export default Vue.extend({
  components: {
    PriceCard,
    PriceHeader,
  },

  props: {
    pricefeeder: Function,
    digits: Number,
    jpyfeeder: {
      type: String,
      default: "bitbank",
    },
  },

  data(): Data {
    return {
      prices: [],
      jpyusd: 1,
      btcjpy: 1,
      btcusd: 1,
    };
  },

  methods: {
    async updatePrice() {
      console.log(name + ": price update");
      const prices = await this.pricefeeder();
      this.prices = prices;
    },
    async updateBTC() {
      const ret = await Promise.all([
        GetBTCJPYPrice(this.jpyfeeder),
        GetBTCUSDPrice(),
      ]);
      this.btcjpy = ret[0];
      this.btcusd = ret[1];
    },
  },

  timers: {
    /* key = name of method */
    updatePrice: {
      interval: 1000,
      repeat: true,
    },
    updateBTC: {
      interval: 1000,
      repeat: true,
    },
  },

  computed: {
    usdprices(): RefinedPrice[] {
      return this.prices.map(item => {
        const refine: RefinedPrice = {
          refinedbid: item.bid,
          refinedask: item.ask,
          ...item,
        };
        if (item.symbol.includes("JPY")) {
          refine.refinedbid = item.bid / this.btcjpy;
          refine.refinedask = item.ask / this.btcjpy;
        }
        if (item.symbol.includes("USD")) {
          refine.refinedbid = item.bid / this.btcusd;
          refine.refinedask = item.ask / this.btcusd;
        }
        return refine;
      });
    },

    Diffbidbid() {
      const bidHigh: number = Math.max(
        ...this.usdprices.map(d => d.refinedbid)
      );
      const bidLow: number = Math.min(...this.usdprices.map(d => d.refinedbid));
      return {
        value: bidHigh - bidLow,
        ratio: bidHigh / bidLow,
      };
    },

    Diffbidask() {
      const bidHigh: number = Math.max(
        ...this.usdprices.map(d => d.refinedbid)
      );
      const askLow: number = Math.min(...this.usdprices.map(d => d.refinedask));
      console.log("askLow", askLow);
      return {
        value: bidHigh - askLow,
        ratio: bidHigh / askLow,
      };
    },
  },
});
</script>
