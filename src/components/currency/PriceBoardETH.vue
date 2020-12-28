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
    ETHJPY is {{ ethjpy }} <br />
    ETHUSD is {{ ethusd }} <br />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PriceCard, { RefinedPrice } from "./PriceCard.vue";
import PriceHeader from "./PriceHeader.vue";
import { Price, GetETHJPYPrice, GetETHUSDPrice } from "./logic/currency";

type Data = {
  prices: Array<Price>;
  jpyusd: number;
  ethjpy: number;
  ethusd: number;
};

export default Vue.extend({
  components: {
    PriceCard,
    PriceHeader,
  },

  props: {
    pricefeeder: Function,
    digits: Number,
  },

  data(): Data {
    return {
      prices: [],
      jpyusd: 1,
      ethjpy: 1,
      ethusd: 1,
    };
  },

  methods: {
    async updatePrice() {
      console.log(name + ": price update");
      const prices = await this.pricefeeder();
      this.prices = prices;
    },
    async updateETH() {
      const ret = await Promise.all([GetETHJPYPrice(), GetETHUSDPrice()]);
      this.ethjpy = ret[0];
      this.ethusd = ret[1];
    },
  },

  timers: {
    /* key = name of method */
    updatePrice: {
      interval: 1000,
      repeat: true,
    },
    updateETH: {
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
          refine.refinedbid = item.bid / this.ethjpy;
          refine.refinedask = item.ask / this.ethjpy;
        }
        if (item.symbol.includes("USD")) {
          refine.refinedbid = item.bid / this.ethusd;
          refine.refinedask = item.ask / this.ethusd;
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
      return {
        value: bidHigh - askLow,
        ratio: bidHigh / askLow,
      };
    },
  },
});
</script>
