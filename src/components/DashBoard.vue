<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        Flash
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-tabs v-model="activetab" background-color="primary" dark centered>
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
          ></component>
        </div>
      </v-tab-item>
    </v-tabs-items>

    <!-- <BTC /> -->
    <!-- <ETH /> -->
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import BTC from "./currency/BTC.vue";
import ETH from "./currency/ETH.vue";
import XRP from "./currency/XRP.vue";
import COMMON from "./currency/PriceBoardCommon.vue";
import {
  GetBtcPrices,
  GetXemPrices,
  GetBchPrices,
} from "./currency/logic/currency";

export default Vue.extend({
  name: "DashBoard",

  components: {
    BTC,
    ETH,
    XRP,
    COMMON,
  },

  data() {
    return {
      activetab: 0,
      tabitems: [
        { tab: "BTC", content: "COMMON", pricefeeder: GetBtcPrices },
        { tab: "ETH", content: "ETH" },
        { tab: "XRP", content: "XRP" },
        { tab: "XEM", content: "COMMON", pricefeeder: GetXemPrices },
        { tab: "BCH", content: "COMMON", pricefeeder: GetBchPrices },
      ],
    };
  },
});
</script>
