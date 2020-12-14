<template>
  <div>
    <price-header></price-header>
    <price-card
      v-for="price in usdprices"
      :key="price.exchange"
      :prices="price"
    ></price-card>

    DiffBidBid: {{ Diffbidbid }} <br />
    DiffBidAsk: {{ Diffbidask }} <br />
    JPYUSD is {{ jpyusd }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PriceCard from "./PriceCard.vue";
import PriceHeader from "./PriceHeader.vue";
import { Price } from "./logic/currency";

type Data = {
  prices: Array<Price>;
  jpyusd: number;
};

export default Vue.extend({
  components: {
    PriceCard,
    PriceHeader,
  },

  props: {
    pricefeeder: Function,
  },

  data(): Data {
    return {
      prices: [],
      jpyusd: 1,
    };
  },

  methods: {
    async updatePrice() {
      console.log(name + ": price update");
      const prices = await this.pricefeeder();
      this.prices = prices;
    },
    async updateExchangeRate() {
      await fetch("https://api.exchangeratesapi.io/latest?base=USD", {
        mode: "cors",
      })
        .then(response => response.json())
        .then(data => (this.jpyusd = data.rates.JPY));
    },
  },

  timers: {
    /* key = name of method */
    updatePrice: {
      interval: 2000,
      repeat: true,
    },
    updateExchangeRate: {
      interval: 2000,
      repeat: true,
    },
  },

  computed: {
    usdprices(): Price[] {
      return this.prices.map(item => {
        if (item.symbol.includes("JPY")) {
          item.bid = item.bid / this.jpyusd;
          item.ask = item.ask / this.jpyusd;
        }
        return item;
      });
    },

    Diffbidbid() {
      const bidHigh: number = Math.max(...this.usdprices.map(d => d.bid));
      const bidLow: number = Math.min(...this.usdprices.map(d => d.bid));
      return {
        value: bidHigh - bidLow,
        ratio: bidHigh / bidLow,
      };
    },

    Diffbidask() {
      const bidHigh: number = Math.max(...this.usdprices.map(d => d.bid));
      const askLow: number = Math.min(...this.usdprices.map(d => d.ask));
      console.log("askLow", askLow);
      return {
        value: bidHigh - askLow,
        ratio: bidHigh / askLow,
      };
    },
  },
});
</script>
