<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        Flash
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-tabs centered>
          <v-tab>BTC</v-tab>
          <v-tab>ETH</v-tab>
          <v-tab>XRP</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <price-header></price-header>
    <price-card :info="{ exchange: 'Binance', low: 100 }"></price-card>
    <price-card :info="{ exchange: 'Huobi', low: 12.2357 }"></price-card>
    <price-card :info="{ exchange: 'Bitbank', low: 12 }"></price-card>
    <price-card :info="{ exchange: 'FTX', low: 12 }"></price-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import PriceCard from "./currency/PriceCard.vue";
import PriceHeader from "./currency/PriceHeader.vue";
import { GetBtcPrices } from "./currency/logic/currency";

export default Vue.extend({
  name: "DashBoard",

  components: {
    PriceCard,
    PriceHeader,
  },

  data: function() {
    return {
      prices: []
    }
  },
});
</script>
