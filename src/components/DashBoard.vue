<template>
  <v-container>
    <!-- <v-row class="text-center">
      <v-col cols="12">
        Flash
      </v-col>
    </v-row> -->
    <v-row class="text-center">
      <v-col cols="12">
        <v-tabs
          v-model="activetab"
          background-color="deep-purple accent-4"
          center-active
          dark
          centered
        >
          <v-tab v-for="item in tabitems" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-tabs-items v-model="activetab">
      <v-tab-item v-for="item in tabitems" :key="item.tab">
        <div v-if="tabitems[activetab].tab === item.tab">
          <component
            v-bind:is="item.content"
            :pricefeeder="item.pricefeeder"
            :digits="item.digits"
            :jpyfeeder="item.jpyfeeder"
          ></component>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-btn @click="getMultiple()">Fire</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import USDBOARD from "./currency/PriceBoardUSD.vue";
import BTCBOARD from "./currency/PriceBoardBTC.vue";
import { Arbinfo, Price } from "arblib";

const arb = new Arbinfo(process.env.VUE_APP_CORSPROXY || "");

export default Vue.extend({
  name: "DashBoard",

  components: {
    USDBOARD,
    BTCBOARD,
    // ETHBOARD,
  },

  data() {
    return {
      activetab: 0,
      tabitems: [
        {
          tab: "BTC",
          content: "USDBOARD",
          pricefeeder: async () => await arb.GetBtcPrices(),
          digits: 2,
        },
        {
          tab: "XEM",
          content: "BTCBOARD",
          pricefeeder: async () => await arb.GetXemPrices(),
          jpyfeeder: "zaif",
        },
        // { tab: "XYM", content: "BTCBOARD", pricefeeder: arb.GetXymPrices },
        {
          tab: "BCH",
          content: "BTCBOARD",
          pricefeeder: async () => await arb.GetBchPrices(),
        },
        {
          tab: "ETH",
          content: "BTCBOARD",
          pricefeeder: async () => await arb.GetEthPrices(),
          digits: 6,
        },
        {
          tab: "XRP",
          content: "BTCBOARD",
          pricefeeder: async () => await arb.GetXrpPrices(),
        },
        {
          tab: "XLM",
          content: "BTCBOARD",
          pricefeeder: async () => await arb.GetXlmPrices(),
        },
        {
          tab: "LTC",
          content: "BTCBOARD",
          pricefeeder: async () => await arb.GetLtcPrices(),
        },
        {
          tab: "DOGE",
          content: "BTCBOARD",
          pricefeeder: async () => await arb.GetDogePrices(),
        },
      ],
    };
  },
});
</script>
