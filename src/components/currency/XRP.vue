<template>
  <div>
    <price-header></price-header>
    <price-card
      v-for="price in usdprices"
      :key="price.exchange"
      :prices="price"
    ></price-card>
    <v-btn @click="updatePrice()">Fire</v-btn>
    <v-btn @click="updateExchangeRate()">Fire2</v-btn>
    JPYUSD is {{ jpyusd }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PriceCard from "./PriceCard.vue";
import PriceHeader from "./PriceHeader.vue";
import { GetXrpPrices, Price } from "./logic/currency";

type Data = {
  prices: Array<Price>;
  jpyusd: number;
};

export default Vue.extend({
  name: "XRP",

  components: {
    PriceCard,
    PriceHeader,
  },

  data(): Data {
    return {
      prices: [],
      jpyusd: 1,
    };
  },

  methods: {
    async updatePrice() {
      console.log("price update");
      const prices = await GetXrpPrices();
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
  },
});
</script>
