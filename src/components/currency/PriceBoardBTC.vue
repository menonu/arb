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
import { Arbinfo, Price } from "arblib";

const arb = new Arbinfo(process.env.VUE_APP_CORSPROXY || "");

type Data = {
  prices: Array<Price>;
  jpyusd: number;
  btcjpy: number;
  btcusd: number;
  timer1: any;
  timer2: any;
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
      default: "zaif",
    },
  },

  data(): Data {
    return {
      prices: [],
      jpyusd: 1,
      btcjpy: 1,
      btcusd: 1,
      timer1: "",
      timer2: "",
    };
  },

  methods: {
    async updatePrice() {
      this.prices = await this.pricefeeder();
      console.log("price updated");
    },
    async updateExchangeRate() {
      const ret = await Promise.all([
        arb.GetBTCJPYPrice(this.jpyfeeder),
        arb.GetBTCUSDPrice(),
      ]);
      this.btcjpy = ret[0];
      this.btcusd = ret[1];

      this.jpyusd = await arb.GetUSDJPYRate();
    },

    cancelAutoUpdate() {
      clearInterval(this.timer1);
      clearInterval(this.timer2);
    },
  },

  beforeDestroy() {
    this.cancelAutoUpdate();
  },

  created() {
    this.updatePrice();
    this.updateExchangeRate();

    this.timer1 = setInterval(this.updatePrice, 2000);
    this.timer2 = setInterval(this.updateExchangeRate, 3000);
  },

  computed: {
    usdprices(): RefinedPrice[] {
      return this.prices.map(item => {
        const refine: RefinedPrice = {
          refinedbid: item.bid,
          refinedask: item.ask,
          usdbid: item.bid,
          usdask: item.ask,
          ...item,
        };
        if (item.symbol.includes("JPY")) {
          refine.refinedbid = item.bid / this.btcjpy;
          refine.refinedask = item.ask / this.btcjpy;
          refine.usdbid = item.bid / this.jpyusd;
          refine.usdask = item.ask / this.jpyusd;
        }
        if (item.symbol.includes("USD")) {
          refine.refinedbid = item.bid / this.btcusd;
          refine.refinedask = item.ask / this.btcusd;
        }
        if (item.symbol.includes("BTC")) {
          refine.usdbid = item.bid * this.btcusd;
          refine.usdask = item.ask * this.btcusd;
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
